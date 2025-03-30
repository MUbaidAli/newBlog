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

const EditBlog = () => {
  const { id } = useParams(); // Get blog ID from URL params
  const editorRef = useRef(null);
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: {},
    status: "",
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
    // Fetch existing blog data
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8484/api/blogs/${id}`);
        setBlog({
          title: res.data.title,
          category: res.data.category,
          content: res.data.content,
          status: res.data.status, // JSON data stored in DB
        });

        // Initialize Editor.js after data is loaded
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
            placeholder: "Edit your blog...",
            data: res.data.content, // Load content
          });
        }
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
      // Get content from Editor.js
      const savedData = await editorRef.current.save();

      // Prepare blog post data
      const blogPost = {
        title: blog.title,
        category: blog.category,
        content: savedData, // Editor.js JSON content
        author: "USER_ID", // Replace with actual logged-in user ID
      };

      //   console.log("updated Blog:", blogPost);
      // Send data to backend using Axios
      const response = await axios.put(
        `http://localhost:8484/api/blogs/${id}`,
        blogPost,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 200) {
        toast("Blog posted successfully!");
        console.log("Response:", response.data);
      } else {
        toast("Failed to Update blog.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast("An error occurred while Updating the blog.");
    }
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
      <div>
        <select
          className="border p-2 w-full rounded mb-2"
          value={blog.category}
          onChange={(e) => setBlog({ ...blog, category: e.target.value })}
        >
          {allCategory.map((cat) => (
            <option key={cat._id} value={`${cat.name}`}>
              {`${cat.name}`}
            </option>
          ))}
        </select>
        <select
          className="border p-2 mb-2 w-full"
          value={blog.status}
          onChange={(e) => setBlog({ ...blog, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="Published">Publish</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>{" "}
      </div>
      <div id="editorjs" className="min-h-[300px] border rounded p-2"></div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default EditBlog;
