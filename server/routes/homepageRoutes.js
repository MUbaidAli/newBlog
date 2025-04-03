const express = require("express");
const { getHomapageData } = require("../controllers/homepageController");
const router = express.Router();

router.get("/", getHomapageData);

module.exports = router;
