const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getCurrentUSer,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getCurrentUSer);

module.exports = router;
