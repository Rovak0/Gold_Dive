const mongooose = require("mongoose");

const expenseSchema = new mongooose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongooose.model("Expense", expenseSchema);
