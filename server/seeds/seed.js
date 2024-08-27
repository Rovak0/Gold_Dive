const db = require("../config/connection");
const { User, Budget, Expense, SavingsGoal } = require("../models");
const cleanDB = require("./cleanDB");

const { users, budgets, expenses, savings } = require("./seedData");
db.once("open", async () => {
  await cleanDB("User", "users");
  await cleanDB("Budget", "budgets");
  await cleanDB("Expense", "expenses");
  let newUser;
  for (user of users) {
    user.savings = savings[0];
    newUser = await User.create(user);
  }
  for (budget of budgets) {
    let nextBudget = await Budget.create(budget);
    console.log(newUser, nextBudget);
    await User.findOneAndUpdate(
      {
        _id: newUser._id,
      },
      {
        $addToSet: {
          budgets: nextBudget._id,
        },
      }
    );
  }
  for (expense of expenses) {
    let nextExpense = await Expense.create(expense);
    await User.findOneAndUpdate(
      {
        _id: newUser._id,
      },
      {
        $addToSet: {
          expenses: nextExpense._id,
        },
      }
    );
  }

  // await User.insertMany(userData);

  console.log("Users seeded!");
  process.exit(0);
});
