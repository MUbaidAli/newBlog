require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./config/db");
dbConnect();
const categoryRoutes = require("./routes/categoryRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const homepageRoutes = require("./routes/homepageRoutes.js");
const contactMailer = require("./routes/contactMailer.js");
const errorHandler = require("./middlewares/errorHandle.js");
const Blog = require("./model/blog.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
const { v2: cloudinary } = require("cloudinary");

// Blog Routes
app.use("/api/blogs", blogRoutes);

// category Operations
app.use("/api/category", categoryRoutes);

// review Routes
app.use("/api/review", reviewRoutes);

// User Routes
app.use("/api/user", userRoutes);

// custome Error Handler Middleware
app.use("/api/homepage", homepageRoutes);
app.use(errorHandler);
app.use("/api/contact", contactMailer);

// listening all requests
app.listen(process.env.PORT, () => {
  console.log(`app is Listening on Port ${process.env.PORT} `);
});
