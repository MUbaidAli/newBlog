const express = require("express");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const Category = require("../model/category");
const router = express.Router();

// get all categories
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const data = await Category.find({});
    res.json(data);
  })
);

// get request for single category

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const data = await Category.findById(id);

    if (!data) {
      throw new ExpressError(404, "Category Not Found");
    }
    res.json(data);
  })
);

// post request to create new Category

router.post(
  "/",
  wrapAsync(async (req, res) => {
    const { name } = req.body;
    console.log(name);
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
  })
);

// put route to update Category

router.put(
  "/:id",
  wrapAsync(async (req, res) => {
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
  })
);

// delete Route for category

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndDelete(id);

    if (!categoryDeleted) {
      throw new ExpressError(404, "Category Not Found");
    }

    res.json({ message: "Category Successfully Deleted" });
  })
);

module.exports = router;
