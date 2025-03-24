const express = require("express");
const router = express.Router();
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
  adminRegister
);
router.get("/me", authMiddleware, getCurrentUSer);
router.put(
  "/update/:id",
  authAdminMiddleware,
  authAdminOnlyMiddleware,
  updateUserDataByAdmin
);
router.post("/logout", logOut);

module.exports = router;
