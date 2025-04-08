import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
function BlogManagement() {
  const { user } = useAuth();
  const [blogs, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //   const blogs = [
  //     {
  //       id: 1,
  //       title: "10 Daily Wellness Habits",
  //       author: "Sarah Khan",
  //       category: "Health",
  //       status: "Published",
  //       date: "Jan 10, 2025",
  //     },
  //     {
  //       id: 2,
  //       title: "How to Stay Active Daily",
  //       author: "Jane Smith",
  //       category: "Fitness",
  //       status: "Scheduled",
  //       date: "Jan 15, 2025",
  //     },
  //   ];

  //   console.log(user);
  useEffect(() => {
    async function fetchBlogsData() {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8484/api/blogs");
        // console.log(res);
        setBlog(res.data);
      } catch (error) {
        // console.log(error);
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogsData();
  }, []);

  async function handleDelete(id) {
    // console.log(id);
    ConfirmDialog(async () => {
      try {
        setIsLoading(true);
        await axios.delete(`http://localhost:8484/api/blogs/${id}`, {
          withCredentials: true,
        });
        setBlog((prevBlogs) => prevBlogs.filter((blog) => id !== blog._id));
      } catch (error) {
        console.log(error);
        toast(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    });
  }

  return (
    <>
      <div className="div flex justify-between items-center px-6">
        <h1 className="text-white text-5xl mb-4">Manage Blog</h1>
        <div className="h-7">
          <button
            onClick={() => navigate("/dashboard/create-blog")}
            class="relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-[#A80F0F] to-[#2F7362] group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              <i class="fa-solid fa-plus"></i> Create A New Blog
            </span>
          </button>
        </div>
      </div>
      {/* Table Container */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 relative rounded-2xl w-[95%]">
          <table className="w-full  text-white rounded-xl overflow-hidden">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-[#FF4242] to-[#99286C] text-left text-white">
                <th className="p-5">Blog Title</th>
                <th className="p-5">Author</th>
                <th className="p-5">Category</th>
                <th className="p-5">Status</th>
                <th className="p-5">Published Date</th>

                {/* Added a header for actions */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="border">
              {blogs.map((blog) => (
                <tr key={blog.id} className="border border-gray-700">
                  <td className="p-3">{blog.title}</td>
                  <td className="p-3">{blog.author}</td>
                  <td className="p-3">{blog.category}</td>
                  <td className="p-3">
                    <span
                      className={
                        blog.status === "Published"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions Column */}
                  <div className="p-3 absolute">
                    <div className="flex gap-2">
                      {(user.role === "Admin" || user.role === "Editor") && (
                        <button
                          className="bg-red-500 p-2 rounded-full w-10 h-10 text-white hover:bg-red-600 cursor-pointer"
                          onClick={() => handleDelete(blog._id)}
                        >
                          🗑
                        </button>
                      )}

                      <button
                        className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
                        onClick={() =>
                          navigate(`/dashboard/manage-blog/${blog._id}`)
                        }
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      ;
    </>
  );
}

export default BlogManagement;
