const User = require("../model/user");
const bcrypt = require("bcryptjs");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig");

const upload = multer({ storage: storage });
const getAllUsers = wrapAsync(async (req, res) => {
  const data = await User.find();

  if (!data) {
    throw new ExpressError(500, "Internal Server Error");
  }
  res.status(200).json({ message: "data received", users: data });
});

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

  console.log(email, password, "test");
  if (!email || !password) {
    throw new ExpressError(400, "Please Enter Email and Password");
  }
  // console.log("thidsssssssssssssssssss");
  const user = await User.findOne({ email });
  // console.log(user, "emailllllll");
  if (!user) {
    throw new ExpressError(404, "User Not Exist");
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  // console.log(passwordMatched, "yes or no");
  const token = generateToken(user._id);
  if (user && passwordMatched) {
    res.cookie("token", token, {
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
      token: token,
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
  const {
    name,
    email,
    password,
    role,
    phone,
    country,
    address,
    dob,
    lastName,
    gender,
  } = req.body;

  if (!["Admin", "Editor", "User"].includes(role)) {
    throw new ExpressError(400, "Invalid Role");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(req.body);
  const newUser = User({
    name,
    email,
    password: hashedPassword,
    role,
    phone,
    country,
    address,
    dob,
    lastName,
    gender,
  });

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
    path: "/",
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

const deleteUser = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new ExpressError(404, "User Not Found");
  }
  res.json({ message: "User Deleted" });
});

const updateUserDataByAdmin = wrapAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(req.file, "file");
  const { path, filename } = req.file;
  const {
    name,
    email,
    password,
    role,
    phone,
    country,
    address,
    dob,
    lastName,
    gender,
  } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw new ExpressError(404, "User Not Found");
  }

  let updatedData = {
    name,
    email,
    role,
    phone,
    country,
    address,
    dob,
    lastName,
    gender,
  };

  // console.log();

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedData.password = hashedPassword;
  }
  // console.log("testtttttttttttttt");
  if (path && filename) {
    updatedData.image = {
      imageUrl: path,
      imgName: filename,
    };
  }

  const data = await User.findByIdAndUpdate(id, updatedData, { new: true });
  console.log(data);
  res.json({ message: "Data Updated" });
});

// generate Token

function generateToken(id) {
  console.log("Signing JWT with Secret:", process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

module.exports = {
  logOut,
  createUser,
  loginUser,
  getCurrentUSer,
  adminRegister,
  deleteUser,
  getAllUsers,
  updateUserDataByAdmin,
};
