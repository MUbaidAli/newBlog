import { useEffect, useState } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import ConfirmDialog from "../components/ConfirmDialog";

function CategoryManagement() {
  const [categoryName, setCategoryName] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  async function fetchCategories() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8484/api/category");
      console.log(res.data);
      setAllCategory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(categoryName, "clicked");

    setIsLoading(true);

    try {
      if (editCategoryId) {
        await axios.put(
          `http://localhost:8484/api/category/${editCategoryId}`,
          {
            name: categoryName,
          }
        );
        toast("Category Updated");

        setAllCategory((prev) =>
          prev.map((cat) =>
            cat._id === editCategoryId ? { name: categoryName, ...cat } : cat
          )
        );
      } else {
        await axios.post("http://localhost:8484/api/category", {
          name: categoryName,
        });
        toast("Category Created");
        setCategoryName("");
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    } finally {
      setIsLoading(false);
      setCategoryName("");
      setEditCategoryId(null);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleDelete(id) {
    ConfirmDialog(async () => {
      try {
        await axios.delete(`http://localhost:8484/api/category/${id}`);
        toast("Category Deleted");

        // Remove the deleted category from state without refetching
        setAllCategory((prevCategories) =>
          prevCategories.filter((cat) => cat._id !== id)
        );
      } catch (error) {
        console.log(error);
        toast(error.message);
      }
    });
  }

  function handleEdit(category) {
    console.log(category);
    setEditCategoryId(category._id);
    setCategoryName(category.name);
    // console.log();
  }

  return (
    <>
      <h1 className="text-white text-5xl mb-4">Categories</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className=" pt-6 md:pt-0 w-full    flex justify-between items-center ">
          <input
            type="text"
            name="category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Type Category Name..."
            className="w-full flex-6 mx-3 border-white text-white outline-0 border-2  justify-center text-center rounded-lg shadow px-10 py-3 flex items-center my-5"
          />
          <div className="flex-2 mx-3">
            <Button
              type="submit"
              className=""
              disabled={!categoryName.length || isLoading}
            >
              {isLoading
                ? "Loading..."
                : editCategoryId
                ? "Edit Category"
                : "Create Category"}
            </Button>
          </div>
        </div>
      </form>

      <div className="flex justify-between items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="p-4 relative rounded-2xl w-[95%]">
            <table className="w-full  text-white rounded-xl overflow-hidden">
              {/* Table Header */}
              <thead>
                <tr className="bg-gradient-to-r from-[#FF4242] to-[#99286C] text-left text-white">
                  <th className="p-5 w-20">s.no</th>
                  <th className="p-5">Cat Id</th>
                  <th className="p-5">Category</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="border">
                {allCategory.map((cat, i) => (
                  <tr key={cat._id} className="border border-gray-700">
                    <td className="p-3">{i}</td>
                    <td className="p-3">{cat._id}</td>
                    <td className="p-3">{cat.name}</td>

                    {/* Actions Column */}
                    <div className="p-3 absolute">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="bg-red-500 p-2 rounded-full w-10 h-10 text-white hover:bg-red-600 cursor-pointer"
                        >
                          🗑
                        </button>

                        <button
                          className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
                          onClick={() => {
                            handleEdit(cat);
                          }}
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
      </div>
    </>
  );
}

export default CategoryManagement;
