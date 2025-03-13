const express = require("express");
const Blog = require("../model/blog");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();

// get Request to show blogs data
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const data = await Blog.find({});
    res.json(data);
  })
);
// get single blog with id
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const data = await Blog.findById(id);
    if (!data) {
      throw new ExpressError(404, "Blog Not Found");
    }
    res.send(data);
  })
);

// post Request to create new blog

router.post(
  "/",
  wrapAsync(async (req, res) => {
    const data = req.body;
    // console.log(data);
    const newBlog = new Blog({ ...data });
    console.log(newBlog);
    await newBlog.save();
    res.status(201).json({ message: "Blog Created Successfully" });
  })
);

// update Blog
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
    if (!updatedBlog) {
      throw new ExpressError(404, "Blog Not Found");
    }
    res.json({ message: "Blog Updated Successfully", Blog: updatedBlog });
  })
);

// delete Request Blog

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      throw new ExpressError(404, "Blog Not Found");
    }
    res.json({ message: "Blog Deleted Successfully" });
  })
);

module.exports = router;
