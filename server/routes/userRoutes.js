const express = require("express");
const { cloudinary, storage } = require("../cloudConfig");
const multer = require("multer");
const upload = multer({ storage });
const router = express.Router();
// console.log(upload.single("image"), "upload");
const {
  createUser,
  loginUser,
  getCurrentUSer,
  adminRegister,
  getAllUsers,
  deleteUser,
  logOut,
  updateUserDataByAdmin,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  authAdminMiddleware,
  authAdminOnlyMiddleware,
} = require("../middlewares/authAdminMiddleware");

router.post("/register", createUser);
router.get("/", authAdminMiddleware, authAdminOnlyMiddleware, getAllUsers);
router.delete("/:id", authAdminMiddleware, authAdminOnlyMiddleware, deleteUser);
router.post("/login", loginUser);
router.post(
  "/adminRegister",
  authAdminMiddleware,
  authAdminOnlyMiddleware,
  upload.single("image"),
  adminRegister
);
// router.post(
//   "/upload",
//   upload.single("image"), // ✅ MUST be before accessing req.file
//   // authAdminMiddleware,
//   // authAdminOnlyMiddleware,
//   (req, res, next) => {
//     console.log(req);
//     console.log("📌 Incoming admin update request...");
//     console.log("📝 req.file:", req.file); // ✅ Should log file data
//     console.log("📩 req.body:", req.body); // ✅ Other form fields

//     if (!req.file) {
//       return res.status(400).json({ message: "No file received" });
//     }

//     next();
//   },
//   (req, res) => {
//     console.log(req.body);
//     res
//       .status(200)
//       .json({ message: "File received successfully", file: req.file });
//   }
// );

router.put(
  "/update/:id",
  upload.single("image"), // ✅ MUST be before accessing req.file
  authAdminMiddleware,
  authAdminOnlyMiddleware,
  // (req, res, next) => {
  //   console.log(req);
  //   console.log("📌 Incoming admin update request...");
  //   console.log("📝 req.file:", req.file); // ✅ Should log file data
  //   console.log("📩 req.body:", req.body); // ✅ Other form fields

  //   if (!req.file) {
  //     return res.status(400).json({ message: "No file received" });
  //   }

  //   next();
  // },
  updateUserDataByAdmin
);
router.get("/me", authMiddleware, getCurrentUSer);
router.put(
  "/update/:id",
  authAdminMiddleware,
  authAdminOnlyMiddleware,

  // upload.single("image"),

  updateUserDataByAdmin
);
router.post("/logout", logOut);

module.exports = router;
