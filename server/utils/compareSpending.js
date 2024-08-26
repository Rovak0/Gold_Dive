const Budget = require("./models/Budget");
const Expense = require("./models/Expense");

const compareSpending = async (userId) => {
  const budgets = await Budget.find({ userId });
  const expenses = await Expense.find({ userId });

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  const alerts = [];

  budgets.forEach((budget) => {
    const spending = categoryTotals[budget.category] || 0;
    if (spending > budget.limit) {
      alerts.push({
        category: budget.category,
        limit: budget.limit,
        spending,
        status: "Exceeded",
      });
    } else if (spending > budget.limit * 0.8) {
      alerts.push({
        category: budget.category,
        limit: budget.limit,
        spending,
        status: "Approaching Limit",
      });
    }
  });

  return alerts;
};

module.exports = { compareSpending };
