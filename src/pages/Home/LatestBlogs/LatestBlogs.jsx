import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCustomerRole from "../../../hooks/useCustomerRole";

const LatestBlogs = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role } = useCustomerRole();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blog-latest"); // calling the backend API
      return res.data;
    },
  });

  const formatBDDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewDetails = async (blog) => {
    if (role === "customer") {
      try {
        await axiosSecure.patch(`/blogs/visit/${blog._id}`);
        navigate(`/blogs/${blog._id}`);
      } catch (err) {
        console.error("Failed to increase visit count", err);
      }
    }

    navigate(`/blogs/${blog._id}`);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className=" py-12 md:px-10 lg:px-20 bg-[radial-gradient(ellipse_at_top_left,_#e1f0ec,_#aed9d9,_#2e4a62)]">
      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center py-2 bg-gradient-to-r from-[#2b6777] via-[#3b8ea5] to-[#66bfbf] text-transparent bg-clip-text">
          Latest Insights from Trust Life
        </h2>
        <p className="mt-4 mx-auto text-[#3b8ea5] text-center mb-12">
          At TrustLife, we believe that knowledge is power. Our blog offers you
          insights into the world of insurance, helping you make informed
          decisions for your future. Whether you're curious about life plans,
          savings options, or financial protection, our latest articles bring
          you real-life guidance from trusted experts and customer stories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white text-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-sm mb-4 text-gray-600">
                    {blog.content.length > 120
                      ? blog.content.slice(0, 120) + "..."
                      : blog.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-gray-500">
                    {formatBDDate(blog.publishDate)}
                  </span>
                  <button
                    onClick={() => handleViewDetails(blog)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          to="/blogs"
          className=" text-white font-semibold px-6 py-2 rounded-full shadow bg-[#baa53a] hover:bg-[#fcd547] transition"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
