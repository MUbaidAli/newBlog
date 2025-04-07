// models/DailyVisit.js
const mongoose = require("mongoose");

const dailyVisitSchema = new mongoose.Schema({
  date: {
    type: String, // e.g., '2025-04-08'
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const DailyVisit = mongoose.model("DailyVisit", dailyVisitSchema);

module.exports = DailyVisit;
