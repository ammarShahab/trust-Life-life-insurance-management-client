import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCustomerRole from "../../hooks/useCustomerRole";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth/useAuth";
import BlogDetailsModal from "./BlogDetailsModal";

const Blogs = () => {
  const { user } = useAuth();
  console.log(user.photoURL);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role } = useCustomerRole();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-blogs");
      return res.data;
    },
  });

  const handleReadMore = async (blog) => {
    if (role === "customer") {
      await axiosSecure.patch(`/blogs/visit/${blog._id}`);
    }
    setSelectedBlog(blog);
  };

  const handleNavigate = (id) => {
    navigate(`/blogs/${id}`);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex flex-col max-w-lg p-6 space-y-4 overflow-hidden rounded-lg shadow-md bg-white text-gray-800"
        >
          <div className="flex space-x-4 items-center">
            <img
              alt={blog.author}
              src={
                user.photoURL || "https://i.ibb.co/rbskskP/default-avatar.png"
              }
              className="object-cover w-12 h-12 rounded-full shadow"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{blog.author}</span>
              <span className="text-xs text-gray-600">{blog.publishDate}</span>
            </div>
          </div>

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

          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaEye /> {blog.totalVisit || 0}
            </span>
          </div>

          <button
            onClick={() => handleReadMore(blog)}
            className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded"
          >
            Read more
          </button>
        </div>
      ))}

      {selectedBlog && (
        <BlogDetailsModal
          blog={selectedBlog}
          onClose={() => {
            setSelectedBlog(null);
            handleNavigate(selectedBlog._id);
          }}
        />
      )}
    </div>
  );
};

export default Blogs;

/* <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
  <div className="flex space-x-4">
    <img
      alt=""
      src="https://source.unsplash.com/100x100/?portrait"
      className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
    />
    <div className="flex flex-col space-y-1">
      <a
        rel="noopener noreferrer"
        href="#"
        className="text-sm font-semibold"
      >
        Leroy Jenkins
      </a>
      <span className="text-xs dark:text-gray-600">4 hours ago</span>
    </div>
  </div>
  <div>
    <img
      src="https://source.unsplash.com/random/100x100/?5"
      alt=""
      className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
    />
    <h2 className="mb-1 text-xl font-semibold">
      Nam cu platonem posidonium sanctus debitis te
    </h2>
    <p className="text-sm dark:text-gray-600">
      Eu qualisque aliquando mel, id lorem detraxit nec, ad elit minimum
      pri. Illum ipsum detracto ne cum. Mundi nemore te ius, vim ad illud
      atqui apeirian...
    </p>
  </div>
  <div className="flex flex-wrap justify-end">
    <div className="flex space-x-2 text-sm dark:text-gray-600">
      <button type="button" className="flex items-center p-1 space-x-1.5">
        <p>Total Visited:</p>

        <span>283</span>
      </button>
    </div>
  </div>
  <button
    type="button"
    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50 bg-yellow-500 hover:bg-yellow-600 text-white"
  >
    Read more
  </button>
</div> */
