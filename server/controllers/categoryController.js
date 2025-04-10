const Category = require("../model/category");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

// get all categories
const getAllCategories = wrapAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const data = await Category.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments();

  res.json({
    data,
    total,
    page,
    limit,
    pages: Math.ceil((total - 1) / limit),
  });
});

// get request for single category

const getCategoryById = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const data = await Category.findById(id);

  if (!data) {
    throw new ExpressError(404, "Category Not Found");
  }
  res.json(data);
});

// post request to create new Category
const createCategory = wrapAsync(async (req, res) => {
  const { name } = req.body;
  // console.log(name);
  if (!name) {
    throw new ExpressError(400, "Category Name is Required");
  }
  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    throw new ExpressError(400, "Category Already Exists");
  }

  const newCategory = Category({ name });
  await newCategory.save();

  res
    .status(201)
    .json({ message: "Category Created Successfully", newCategory });
});

// put route to update Category

const updateCategory = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new ExpressError(400, "Category Name Is Required");
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ExpressError(404, "Category Not Updated");
  }

  res.json({
    message: "Category Successfully Updated",
    category: updatedCategory,
  });
});

// delete Route for category

const deleteCategory = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const categoryDeleted = await Category.findByIdAndDelete(id);

  if (!categoryDeleted) {
    throw new ExpressError(404, "Category Not Found");
  }

  res.json({ message: "Category Successfully Deleted" });
});

module.exports = {
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
  createCategory,
};
