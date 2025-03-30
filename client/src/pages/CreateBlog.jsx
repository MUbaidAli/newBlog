import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import CodeTool from "@editorjs/code";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreateBlog = () => {
  const editorRef = useRef(null); // Store EditorJS instance
  const { user } = useAuth();
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    status: "",
    image: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          image: ImageTool,
          embed: Embed,
          code: CodeTool,
        },
        placeholder: "Start writing your blog post...",
        autofocus: true,
      });

      // Store Editor.js instance in ref
      editorRef.current = editorRef.current;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);
  function handleImageChange(e) {
    console.log(e.target.files[0]);
    setBlogData({ ...blogData, image: e.target.files[0] });
    console.log(blogData);
  }

  // const handleSubmit = async () => {
  //   if (!editorRef.current) return;

  //   // Get data from Editor.js
  //   const savedData = await editorRef.current.save();

  //   // Prepare blog post data
  //   const blogPost = {
  //     title: blogData.title,
  //     category: blogData.category,
  //     content: savedData, // Save Editor.js JSON content
  //   };

  //   console.log("Blog Data:", blogPost);
  //   // You can now send `blogPost` to the backend via API request
  // };

  const handleSubmit = async () => {
    if (!editorRef.current) return;

    try {
      // Get content from Editor.js
      const savedData = await editorRef.current.save();

      const form = new FormData();
      form.append("title", blogData.title);
      form.append("category", blogData.category);
      form.append("status", blogData.status);
      form.append("content", savedData);
      form.append("author", user._id);
      form.append("image", blogData.image);

      console.log(form.get("image"), "featured image");
      // Prepare blog post data
      // const blogPost = {
      //   title: blogData.title,
      //   category: blogData.category,
      //   status: blogData.status,
      //   content: savedData, // Editor.js JSON content
      //   author: user._id, // Replace with actual logged-in user ID
      // };

      // console.log(blogPost);
      // Send data to backend using Axios
      const response = await axios.post(
        "http://localhost:8484/api/blogs",
        form,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("Blog posted successfully!");
        console.log("Response:", response.data);
      } else {
        alert("Failed to post blog.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while posting the blog.");
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Create Blog</h2>
      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="Enter blog title..."
        value={blogData.title}
        onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
      />
      <div className="flex justify-between">
        <select
          className="border p-2 mb-2 w-full"
          value={blogData.category}
          onChange={(e) =>
            setBlogData({ ...blogData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {allCategory.map((cat) => (
            <option key={cat._id} value={`${cat.name}`}>
              {`${cat.name}`}
            </option>
          ))}
        </select>
        <select
          className="border p-2 mb-2 w-full"
          value={blogData.status}
          onChange={(e) => setBlogData({ ...blogData, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="Published">Publish</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      <div id="editorjs" className="min-h-[300px] border rounded p-2"></div>
      <label
        htmlFor="dropzone-file"
        className="my-10 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
          onChange={handleImageChange}
        />
      </label>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Publish Blog
      </button>
    </div>
  );
};

export default CreateBlog;
