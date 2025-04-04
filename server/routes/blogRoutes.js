const express = require("express");
const router = express.Router();

const {
  getBlogByCategory,
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
  searchBlog,
} = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  authAdminMiddleware,
  authAdminOnlyMiddleware,
} = require("../middlewares/authAdminMiddleware");

const { storage, cloudinary } = require("../cloudConfig");
const multer = require("multer");
const upload = multer({ storage });

router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/search", searchBlog);

// get Request to show blogs data
router.get("/", getAllBlogs);
// get single blog with id
router.get("/:id", getBlogById);
router.get("/category/:id", getBlogByCategory);

// post Request to create new blog

router.post("/", upload.single("image"), authAdminMiddleware, createBlog);

// update Blog
router.put("/:id", upload.single("image"), authAdminMiddleware, updateBlog);

// delete Request Blog

router.delete("/:id", authAdminMiddleware, authAdminOnlyMiddleware, deleteBlog);

module.exports = router;
