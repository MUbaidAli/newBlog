import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

function AdminSearch({ result }) {
  const { user } = useAuth();
  const [blogs, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setBlog(result);
  // }, []);

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
        // console.log(error);
        toast(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    });
  }
  // console.log(blogs);
  // console.log(result, "coming from Search Admn");
  return (
    <>
      <h1 className="text-white text-4xl">Search Items</h1>
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
              {result.map((blog) => (
                <tr key={blog._id} className="border border-gray-700">
                  {/* {console.log(blog.id)} */}
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
export default AdminSearch;
