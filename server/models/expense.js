const mongooose = require("mongoose");

const expenseSchema = new mongooose.Schema({
  userId: {
    type: mongooose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongooose.model("Expense", expenseSchema);
