const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getCurrentUSer,
  adminRegister,
  logOut,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/adminRegister", authAdminMiddleware, adminRegister);
router.get("/me", authMiddleware, getCurrentUSer);
router.get("/logout", logOut);

module.exports = router;
