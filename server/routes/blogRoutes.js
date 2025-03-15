const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

// get Request to show blogs data
router.get("/", getAllBlogs);
// get single blog with id
router.get("/:id", getBlogById);

// post Request to create new blog

router.post("/", authMiddleware, createBlog);

// update Blog
router.put("/:id", authMiddleware, updateBlog);

// delete Request Blog

router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
