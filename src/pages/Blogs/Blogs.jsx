import { useQuery } from "@tanstack/react-query";
import { data, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCustomerRole from "../../hooks/useCustomerRole";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import useAxios from "../../hooks/useAxios";

const Blogs = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role } = useCustomerRole();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-blogs");
      return res.data;
    },
  });

  const handleReadMore = async (blog) => {
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

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <Helmet>
        <title>Trust Life | Blogs</title>
      </Helmet>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex flex-col max-w-lg p-6 space-y-4 overflow-hidden rounded-lg shadow-md bg-white text-gray-800"
        >
          {/* Author Section */}
          <div className="flex space-x-4 items-center">
            <img
              alt={blog.author}
              src={
                blog.authorImage ||
                "https://i.ibb.co/rbskskP/default-avatar.png"
              }
              className="object-cover w-12 h-12 rounded-full shadow"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{blog.author}</span>
              <span className="text-xs text-gray-600">
                {new Date(blog.publishDate).toLocaleString("en-BD", {
                  timeZone: "Asia/Dhaka",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <div>
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="object-cover w-full mb-4 h-48 rounded-md"
            />
            <h2 className="mb-2 text-xl font-bold">{blog.title}</h2>
            <p className="text-sm text-gray-700">
              {blog.content.split(" ").slice(0, 30).join(" ")}...
            </p>
          </div>

          {/* Blog Footer */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaEye className="text-yellow-600" /> {blog.totalVisit || 0}
            </span>
          </div>

          {/* Read More Button */}
          <button
            onClick={() => handleReadMore(blog)}
            className="w-full px-4 py-2 bg-[#baa53a] hover:bg-[#fcd547] text-white font-semibold transition rounded"
          >
            Read more
          </button>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
