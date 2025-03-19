require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./config/db");
dbConnect();
const categoryRoutes = require("./routes/categoryRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const errorHandler = require("./middlewares/errorHandle.js");
const Blog = require("./model/blog.js");
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Blog Routes
app.use("/api/blogs", blogRoutes);

// category Operations
app.use("/api/category", categoryRoutes);

// review Routes
app.use("/api/review", reviewRoutes);

// User Routes
app.use("/api/user", userRoutes);

// custome Error Handler Middleware

app.use(errorHandler);

// listening all requests
app.listen(process.env.PORT, () => {
  console.log(`app is Listening on Port ${process.env.PORT} `);
});
