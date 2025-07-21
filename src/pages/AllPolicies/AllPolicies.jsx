import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const AllPolicies = () => {
  const axiosInstance = useAxios();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useQuery({
    queryKey: ["policies", selectedCategory, searchText, currentPage],
    queryFn: async () => {
      let url = `/all-policies?page=${currentPage}&limit=${limit}`;

      if (selectedCategory !== "all") {
        url += `&category=${selectedCategory}`;
      }

      if (searchText.trim() !== "") {
        url += `&search=${encodeURIComponent(searchText.trim())}`;
      }

      const res = await axiosInstance.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>Trust Life | All Policies</title>
      </Helmet>

      {/* Filters and Search */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {["all", "Term Life", "Senior Plan", "Family Plan", "Child Plan"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-[#baa53a] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        <input
          type="text"
          placeholder="Search policies..."
          className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-[#baa53a] max-w-md w-full"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {/* Loading or Error */}
      {isLoading ? (
        <Loading />
      ) : data?.policies?.length === 0 ? (
        <p className="text-center text-gray-500">No policies found.</p>
      ) : (
        <>
          {/* Policies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.policies.map((policy) => (
              <div
                key={policy._id}
                className="bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-200 overflow-hidden"
              >
                <img
                  src={policy.image}
                  alt={policy.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {policy.title}
                  </h3>
                  <p className="text-sm font-bold text-[#baa53a] mt-1">
                    Category: {policy.category}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    {policy.description?.slice(0, 80)}...
                  </p>
                  <Link
                    to={`/policy/${policy._id}`}
                    className="inline-block text-sm font-medium text-[#baa53a] hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages).keys()].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum + 1)}
                  className={`px-4 py-2 rounded-md border text-sm ${
                    currentPage === pageNum + 1
                      ? "bg-[#baa53a] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPolicies;
