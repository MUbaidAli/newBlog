const Blog = require("../model/blog");
const Category = require("../model/category");
const DailyVisit = require("../model/dailyVisits");
const wrapAsync = require("../utils/wrapAsync");

const getHomapageData = wrapAsync(async (req, res) => {
  const blogData = await Blog.find().sort({ createdAt: -1 }).limit(3);
  const categoryData = await Category.find().limit(4);

  res.json({ blogData, categoryData });
});

//

const getDashboardData = wrapAsync(async (req, res) => {
  try {
    const publishedCount = await Blog.countDocuments({ status: "Published" });
    const draftCount = await Blog.countDocuments({ status: "Draft" });

    const today = new Date().toISOString().split("T")[0];
    const todayVisit = await DailyVisit.findOne({ date: today });

    res.json({
      publishedCount,
      draftCount,
      todayViews: todayVisit?.count || 0,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { getHomapageData, getDashboardData };
