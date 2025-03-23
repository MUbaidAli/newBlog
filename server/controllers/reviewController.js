const Blog = require("../model/blog");

const Review = require("../model/reviews");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

const getBlogReviews = wrapAsync(async (req, res) => {
  const blog = await Review.find().populate("blog");
  console.log(blog);
  res.json({ message: "Blogs Data", blog });
});

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

// update status
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({
      message: "Review approved successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createReview,
  updateReview,
  getSingleBlogReviews,
  deleteReview,
  getBlogReviews,
};
