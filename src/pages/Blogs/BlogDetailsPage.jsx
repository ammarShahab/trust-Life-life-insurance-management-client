import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

import useAxios from "../../hooks/useAxios";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  // Fetch single blog data
  const { data: blog = {} } = useQuery({
    queryKey: ["singleBlog", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/blogs/${id}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-700 flex items-center gap-2">
                  {blog.author}
                  <span className="badge badge-info text-white text-xs">
                    Customer
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Published on:{" "}
                  {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaEye className="text-blue-600" />
              <span>{blog.totalVisit ? blog.totalVisit : 0} views</span>
            </div>
          </div>

          <div className="text-gray-700 text-justify leading-relaxed text-base whitespace-pre-line">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
