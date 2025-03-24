const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please Enter Name"] },
    lastName: { type: String },
    gender: { type: String, enum: ["Male", "Female"] },
    DOB: { type: Date },
    phone: { type: String },
    country: { type: String },
    address: { type: String },

    email: {
      type: String,
      required: [true, "please enter Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      min: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Editor", "User"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
