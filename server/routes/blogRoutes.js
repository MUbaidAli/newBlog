const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// get Request to show blogs data
router.get("/", getAllBlogs);
// get single blog with id
router.get("/:id", getBlogById);

// post Request to create new blog

router.post("/", createBlog);

// update Blog
router.put("/:id", updateBlog);

// delete Request Blog

router.delete("/:id", deleteBlog);

module.exports = router;
