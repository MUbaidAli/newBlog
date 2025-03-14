const Blog = require("../model/blog");
const Review = require("../model/reviews");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

// post request for creating a review
const createReview = wrapAsync(async (req, res) => {
  const { blogId } = req.params;
  const { name, rating, review } = req.body;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ExpressError(404, "Blog Not Found");
  }

  // saving new Review
  const newReview = Review({ blog: blogId, name, rating, review });
  await newReview.save();

  // push the review_id in Blog

  blog.reviews.push(newReview._id);
  await blog.save();

  res.status(201).json({ message: "Review Added", review: newReview });
});

// get request for geting a specific blog reviews

const getSingleBlogReviews = wrapAsync(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId).populate("reviews");

  if (!blog) {
    throw new ExpressError(404, "Blog Not Found");
  }

  res.json(blog.reviews);
});

// delete review
const deleteReview = wrapAsync(async (req, res) => {
  const { reviewId } = req.params;

  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    throw new ExpressError(404, "Review Not Found");
  }
  res.json({ message: "review Deleted" });
});

module.exports = { createReview, getSingleBlogReviews, deleteReview };
