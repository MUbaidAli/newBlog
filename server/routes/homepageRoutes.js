const express = require("express");
const {
  getHomapageData,
  getDashboardData,
} = require("../controllers/homepageController");
const { authUserRole } = require("../middlewares/authUserRole");
const router = express.Router();

router.get("/", getHomapageData);
router.get("/dash", getDashboardData);

module.exports = router;
