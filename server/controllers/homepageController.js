const Blog = require("../model/blog");
const Category = require("../model/category");
const wrapAsync = require("../utils/wrapAsync");

const getHomapageData = wrapAsync(async (req, res) => {
  const blogData = await Blog.find().sort({ createdAt: -1 }).limit(3);
  const categoryData = await Category.find().limit(4);

  res.json({ blogData, categoryData });
});

module.exports = { getHomapageData };
