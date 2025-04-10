const dotenv = require("dotenv");
dotenv.config(); // ✅ Load .env variables first

const cloudinary = require("cloudinary").v2; // ✅ Use .v2 explicitly
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// ✅ Initialize Cloudinary correctly
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log("running");
// ✅ Ensure Cloudinary is loaded (Debugging)
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  // console.error("❌ Cloudinary ENV variables are missing!");
}

// ✅ Ensure Cloudinary Storage is Correct
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "png", "jpeg"],
    resource_type: "image", // ✅ Ensures proper file type handling
  },
});

module.exports = { storage, cloudinary };
