const mongoose = require("mongoose");
const Review = require("./reviews");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: Object, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    views: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Published", "Draft", "Archived"],
      required: true,
      default: "Draft",
    },
    image: {
      imageUrl: String,
      imgName: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

blogSchema.pre("findOneAndDelete", async function (next) {
  const blog = await this.model.findOne(this.getFilter());

  if (blog) {
    await Review.deleteMany({ blog: blog._id });
  }
  console.log(blog);
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
