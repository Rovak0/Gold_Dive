const SavingsGoal = require("./models/SavingsGoal");

const updateSavingsGoals = async () => {
  const goals = await SavingsGoal.find();

  goals.forEach(async (goal) => {
    const progress = (goal.currentAmount / goal.goalAmount) * 100;
    goal.progress = progress;
    await goal.save();
  });
};

module.exports = { updateSavingsGoals };
