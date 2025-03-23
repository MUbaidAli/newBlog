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
  });

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

      // Prepare blog post data
      const blogPost = {
        title: blogData.title,
        category: blogData.category,
        status: blogData.status,
        content: savedData, // Editor.js JSON content
        author: user._id, // Replace with actual logged-in user ID
      };

      console.log(blogPost);
      // Send data to backend using Axios
      const response = await axios.post(
        "http://localhost:8484/api/blogs",
        blogPost,
        {
          headers: {
            "Content-Type": "application/json",
          },
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
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
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
