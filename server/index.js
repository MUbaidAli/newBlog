require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./config/db");
dbConnect();
const Blog = require("./model/blog.js");
const ExpressError = require("./utils/expressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const Category = require("./model/category.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");

app.use(express.json());
// Blog Routes
app.use("/api/blogs", blogRoutes);

// category Operations
app.use("/api/category", categoryRoutes);

// custome Error Handler Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;

  res.status(statusCode).json({ error: message });
});

// listening all requests
app.listen(process.env.PORT, () => {
  console.log(`app is Listening on Port ${process.env.PORT} `);
});
