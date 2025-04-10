import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import CodeTool from "@editorjs/code";
import axios from "axios";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const EditBlog = () => {
  const { id } = useParams();
  const editorRef = useRef(null);
  const { user } = useAuth();
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: {},
    status: "",
    featureImage: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCategories() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8484/api/category");
      setAllCategory(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8484/api/blogs/${id}`);
        setBlog({
          title: res.data.title,
          category: res.data.category,
          content: JSON.parse(res.data.content),
          status: res.data.status,
          featureImage: res.data.image,
        });

        setTimeout(() => {
          if (!editorRef.current) {
            editorRef.current = new EditorJS({
              holder: "editorjs",
              tools: {
                header: Header,
                list: List,
                image: {
                  class: ImageTool,
                  config: {
                    uploader: {
                      uploadByFile(file) {
                        const formData = new FormData();
                        formData.append("image", file);
                        return axios
                          .post(
                            "http://localhost:8484/api/blogs/upload-image",
                            formData
                          )
                          .then((res) =>
                            // console.log(res.data.file.url),
                            ({
                              success: 1,
                              file: { url: res.data.file.url },
                            })
                          )
                          .catch(() => ({ success: 0 }));
                      },
                    },
                  },
                },
                embed: Embed,
                code: CodeTool,
              },
              placeholder: "Edit your blog...",
              data: JSON.parse(res.data.content) || {},
            });
          }
        }, 500);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
      }
      editorRef.current = null;
    };
  }, [id]);

  async function handleSubmit() {
    if (!editorRef.current) return;

    try {
      const savedData = await editorRef.current.save();
      if (!blog.title || !blog.category || !blog.status) {
        toast("Please fill out all fields, including the image.");
        return;
      }

      const form = new FormData();
      form.append("title", blog.title);
      form.append("category", blog.category);
      form.append("status", blog.status);
      form.append("content", JSON.stringify(savedData)); // Ensure it's a stringified JSON
      form.append("author", user._id);
      form.append("image", blog.image); // Ensure the image is set

      // Log the form data to check
      // for (let pair of form.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      const response = await axios.put(
        `http://localhost:8484/api/blogs/${id}`,
        form,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast("Blog updated successfully!");
      } else {
        toast("Failed to update blog.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast("An error occurred while updating the blog.");
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setBlog({ ...blog, image: file });
    // const formData = new FormData();
    // formData.append("image", file);

    // try {
    //   const res = await axios.post(
    //     "http://localhost:8484/api/upload",
    //     formData
    //   );
    // } catch (error) {
    //   console.error("Image upload error:", error);
    // }
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Edit Blog Post</h2>
      <input
        type="text"
        className="border p-2 w-full rounded mb-2"
        placeholder="Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />

      <select
        className="border p-2 w-full rounded mb-2"
        value={blog.category}
        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {allCategory.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        className="border p-2 mb-2 w-full rounded"
        value={blog.status}
        onChange={(e) => setBlog({ ...blog, status: e.target.value })}
      >
        <option value="">Select Status</option>
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
        <option value="Archived">Archived</option>
      </select>
      <div
        id="editorjs"
        className="min-h-[300px] border rounded p-2 bg-gray-100"
      ></div>

      {/* <input
        type="file"
        className="border p-2 w-full rounded my-2"
        onChange={handleImageUpload}
        placeholder="Chooose"
      /> */}
      <label
        htmlFor="dropzone-file"
        className="my-5 flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-2 pb-2">
          <svg
            className="w-3 h-3 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload Feature Image</span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          name="featuredImage"
          // value={formData.image}
          onChange={handleImageUpload}
        />
      </label>
      {console.log(blog.featureImage.imageUrl, "Bloggg")}
      {blog.featureImage.imageUrl && (
        <img
          src={blog.featureImage.imageUrl}
          alt="Feature"
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Save
      </button>
    </div>
  );
};

export default EditBlog;
