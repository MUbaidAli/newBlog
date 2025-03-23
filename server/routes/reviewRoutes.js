const express = require("express");
const router = express.Router();
const {
  createReview,
  getSingleBlogReviews,
  deleteReview,
  getBlogReviews,
  updateReview,
} = require("../controllers/reviewController");

// post request for creating a review
router.post("/:blogId", createReview);

// put request for geting a Post reviews

router.get("/", getBlogReviews);
router.get("/:blogId/", getSingleBlogReviews);

// delete review
router.delete("/:reviewId", deleteReview);

// update review status
// Update review status to "Approved"
router.put("/reviews/:id", updateReview);

module.exports = router;
