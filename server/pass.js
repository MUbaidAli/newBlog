// require("dotenv").config();
// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// console.log(cloudinary.uploader);
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// // console.log(upload());

// // cloudinary.uploader.upload("test.jpg", { folder: "test" }, (error, result) => {
// //   if (error) console.log("Cloudinary Error:", error);
// //   else console.log("Upload Successful:", result);
// // });

const bcrypt = require("bcrypt");

const generateHashedPassword = async (password) => {
  const saltRounds = 10; // Recommended value
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("🔐 Hashed Password:", hashedPassword);
  return hashedPassword;
};

// Example Usage
generateHashedPassword("123456");
