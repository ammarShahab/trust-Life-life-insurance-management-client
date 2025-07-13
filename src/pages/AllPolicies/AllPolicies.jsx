import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router";

const AllPolicies = () => {
  const axiosInstance = useAxios();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies", selectedCategory],
    queryFn: async () => {
      const url =
        selectedCategory === "all"
          ? "/all-policies"
          : `/all-policies?category=${selectedCategory}`;
      const res = await axiosInstance.get(url);
      return res.data;
    },
  });

  const categories = [
    "all",
    "Term Life",
    "Senior Plan",
    "Family Plan",
    "Child Plan",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">All Policies</h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-[#baa53a] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Policies Grid */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-200 overflow-hidden border border-gray-100"
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
      )}
    </div>
  );
};

export default AllPolicies;
