const mongoose = require("mongoose");

const savingsGoalSchema = new mongoose.Schema({
  goalAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  targetDate: {
    type: Date,
    required: true,
  },
});

module.exports = savingsGoalSchema;
