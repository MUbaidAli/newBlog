const Blog = require("../model/blog");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

// get Request to show blogs data
const getAllBlogs = wrapAsync(async (req, res) => {
  const data = await Blog.find({});
  res.json(data);
});

// get single blog with id
const getBlogById = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const data = await Blog.findById(id).populate("reviews");
  if (!data) {
    throw new ExpressError(404, "Blog Not Found");
  }
  console.log(data);
  res.send(data);
});

// post Request to create new blog

const createBlog = wrapAsync(async (req, res) => {
  const data = req.body;
  // console.log(data);
  const newBlog = new Blog({ ...data });
  console.log(newBlog);
  await newBlog.save();
  res.status(201).json({ message: "Blog Created Successfully" });
});

// update Blog
const updateBlog = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
  if (!updatedBlog) {
    throw new ExpressError(404, "Blog Not Found");
  }
  res.json({ message: "Blog Updated Successfully", Blog: updatedBlog });
});

// delete Request Blog
const deleteBlog = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    throw new ExpressError(404, "Blog Not Found");
  }
  res.json({ message: "Blog Deleted Successfully" });
});

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
