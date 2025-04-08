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
    const weeklyViews = await DailyVisit.find(
      {},
      { _id: 0, date: 1, count: 1 }
    );
    const blogData = await Blog.find(
      {},
      { _id: 0, title: 1, views: 1, createdAt: 1 }
    )
      .sort({ date: 1 })
      .limit(7);
    // console.log(weeklyViews);
    const formattedResult = weeklyViews.map((item) => ({
      date: item.date,
      views: item.count,
    }));
    res.json({
      publishedCount,
      draftCount,
      todayViews: todayVisit?.count || 0,
      weeklyViews: formattedResult,
      blogData,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { getHomapageData, getDashboardData };
