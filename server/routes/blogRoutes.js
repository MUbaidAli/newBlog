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
const {
  authAdminMiddleware,
  authAdminOnlyMiddleware,
} = require("../middlewares/authAdminMiddleware");

const { storage, cloudinary } = require("../cloudConfig");
const multer = require("multer");
const upload = multer({ storage });
// get Request to show blogs data
router.get("/", getAllBlogs);
// get single blog with id
router.get("/:id", getBlogById);

// post Request to create new blog

router.post("/", upload.single("image"), authAdminMiddleware, createBlog);

// update Blog
router.put("/:id", authAdminMiddleware, updateBlog);

// delete Request Blog

router.delete("/:id", authAdminMiddleware, authAdminOnlyMiddleware, deleteBlog);

module.exports = router;
