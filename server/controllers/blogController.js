const Blog = require("../model/blog");
const Category = require("../model/category");
const User = require("../model/user");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

// get Request to show blogs data
const getAllBlogs = wrapAsync(async (req, res) => {
  const data = await Blog.find().sort({ createdAt: -1 });
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
  const { title, content, category, author, status } = req.body;
  const { path, filename } = req.file;
  console.log(path, filename, "the file data", req.file);
  if (!title || !content || !category) {
    throw new ExpressError(400, "Please Fill All Test Fields");
  }
  // console.log(data);
  const newBlog = new Blog({
    title,
    category,
    content,
    user: req.user._id,
    author: req.user.name,
    status,
    image: { imageUrl: path, imgName: filename },
  });
  console.log(newBlog);
  await newBlog.save();
  res.status(201).json({ message: "Blog Created Successfully" });
});

// update Blog
const updateBlog = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content, category, author, status } = req.body;
  const { path, filename } = req.file;

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ExpressError(404, "Blog Not Found");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ExpressError(401, "User Not Found");
  }

  // if (user.id !== blog.user.toString()) {
  //   // console.log(blog.user.toString() !== user.id);
  //   throw new ExpressError(401, "You Are Not Authorizedddddd");
  // }
  const updatedData = {
    title,
    category,
    content,
    user: req.user._id,
    author: req.user.name,
    status,
    image: { imageUrl: path, imgName: filename },
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.json({ message: "Blog Updated Successfully", Blog: updatedBlog });
});

// delete Request Blog
const deleteBlog = wrapAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id, "this also runss");
  // console.log(req, "req");
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ExpressError(404, "Blog Not Found");
  }

  const user = await User.findById(req.user._id);
  console.log(user, "user Runs");
  if (!user) {
    throw new ExpressError(401, "User Not Found");
  }

  // dont need this because it is check that only user that created the blog can delete the post but now i change the functionality to only admin can delete so removing this
  // if (user.id !== blog.user.toString()) {
  //   console.log(user.id, blog.user.toString());
  //   // here is the error
  //   throw new ExpressError(401, "You Are Not Authorized ");
  // }

  const deletedBlog = await Blog.findByIdAndDelete(id);

  res.json({ message: "Blog Deleted Successfully" });
});

// upload Image

const uploadImage = async (req, res) => {
  try {
    const { path } = req.file;

    console.log("running");
    // Create a publicly accessible URL (assuming it's saved in a directory where it can be accessed)
    const imageUrl = `${path}`;
    console.log("running");
    console.log("running");
    res.json({
      success: 1,
      file: {
        url: imageUrl, // Send back the URL for the image
      },
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

// category blog

const getBlogByCategory = wrapAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const category = await Category.findById(id);
  console.log("category", category);
  if (!category) {
    throw new ExpressError(404, "Category Not Found");
  }
  const blogData = await Blog.find({ category: category.name });
  console.log(blogData);
  if (blogData.length > 0) {
    res.json(blogData);
  } else {
    res.json({ message: "No Blog Found For Related Category" });
  }
});

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
  getBlogByCategory,
};
