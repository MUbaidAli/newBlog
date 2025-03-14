const express = require("express");
const router = express.Router();
const {
  createReview,
  getSingleBlogReviews,
  deleteReview,
} = require("../controllers/reviewController");

// post request for creating a review
router.post("/:blogId", createReview);

// put request for geting a Post reviews

router.get("/:blogId/", getSingleBlogReviews);

// delete review
router.delete("/:reviewId", deleteReview);

module.exports = router;
