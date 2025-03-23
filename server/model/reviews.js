const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    status: { type: String, enum: ["Approved", "Pending"], default: "Pending" },
  },
  { timestamps: true }
);

// review , blog id
reviewSchema.pre("findOneAndDelete", async function (next) {
  const review = await this.model.findOne(this.getFilter()); // Get the review being deleted
  console.log(review);
  if (review) {
    const Blog = require("./blog");
    const data = await Blog.findByIdAndUpdate(review.blog, {
      $pull: { reviews: review._id },
    });
  }

  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
