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

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "User",
  });

  const userAdded = await newUser.save();

  if (userAdded) {
    res.status(201).json({
      _id: userAdded._id,
      name: userAdded.name,
      email: userAdded.email,
      role: userAdded.role,
      token: generateToken(userAdded._id),
    });
  } else {
    // res.status(400);
    throw new ExpressError(400, "invalid User Status");
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
    res.cookie("token", generateToken(user._id), {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      secure: true, // Use true in production with HTTPS
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else if (user && !passwordMatched) {
    throw new ExpressError(400, "Incorrect Password");
  } else {
    // res.status(400);
    throw new ExpressError(500, "Server Error");
  }
});

// admin Register
const adminRegister = wrapAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["Admin", "Editor", "User"].includes(role)) {
    throw new ExpressError(400, "Invalid Role");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = User({ name, email, password: hashedPassword, role });

  const userAdded = await newUser.save();
  if (userAdded) {
    res.status(201).json({ message: "registered Successfully" });
  } else {
    res.status(400);
    throw new ExpressError("invalid User");
  }
});

// logout
const logOut = wrapAsync((req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Ensure it's secure in production
    sameSite: "Strict",
  });

  res.json({ message: "Logged Out Successfully" });
});

// get user
const getCurrentUSer = wrapAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ExpressError(404, "User Not Found");
  }

  res.json({ message: "User data", user });
});

// generate Token

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

module.exports = {
  logOut,
  createUser,
  loginUser,
  getCurrentUSer,
  adminRegister,
};
