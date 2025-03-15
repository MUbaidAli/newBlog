const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please Enter Name"] },
    email: {
      type: String,
      required: [true, "please enter Email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please Enter Password"] },
    roll: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
