const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../controllers/categoryController");

// get all categories
router.get("/", getAllCategories);

// get request for single category

router.get("/:id", getCategoryById);

// post request to create new Category

router.post("/", createCategory);

// put route to update Category

router.put("/:id", updateCategory);

// delete Route for category

router.delete("/:id", deleteCategory);

module.exports = router;
