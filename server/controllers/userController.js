const User = require("../model/user");
const bcrypt = require("bcryptjs");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");

const createUser = wrapAsync(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new ExpressError(400, "Please Add All Fields");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new ExpressError(400, "User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = User({ name, email, password: hashedPassword });

  const userAdded = await newUser.save();

  if (userAdded) {
    res.status(201).json({
      _id: userAdded._id,
      name: userAdded.name,
      email: userAdded.email,
      token: generateToken(userAdded._id),
    });
  } else {
    res.status(400);
    throw new ExpressError("invalid User Status");
  }
});

const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ExpressError(400, "Please Enter Email and Password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ExpressError(404, "User Not Exist");
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (user && passwordMatched) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else if (user && !passwordMatched) {
    throw new ExpressError(400, "Incorrect Password");
  } else {
    // res.status(400);
    throw new ExpressError(500, "Server Error");
  }
});

// get user
const getCurrentUSer = wrapAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ message: "User data", user });
});

// generate Token

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

module.exports = { createUser, loginUser, getCurrentUSer };
