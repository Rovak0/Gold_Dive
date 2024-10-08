const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    enum: ["monthly", "yearly"],
    default: "monthly",
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
