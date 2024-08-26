const User = require("../models/user");

const compareSpending = async (userId) => {
  //   const user = await User.findById(userId)
  const user = await User.findOne({ username: "jalenwilliams90" })
    .populate("budgets")
    .populate("expenses");
  const budgets = user.budgets;
  const expenses = user.expenses;
  console.log(budgets);
  console.log(expenses);
  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  const alerts = [];
  console.log(categoryTotals);

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
  console.log(alerts);
  return alerts;
};

// compareSpending();

module.exports = { compareSpending };
