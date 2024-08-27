const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { _id }) => {
      return await User.findOne({ _id: _id });
    },
    incomes: async (parent, args, context) => {
      //the user variables are stored on the token, which is context
      
      const user = await User.findOne({ _id: context.user._id });
      return user.incomes;
    },
    expenses: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });
      return user.expenses;
    },
    savings: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });
      return user.savings;
    },
    budget: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });
      return user.budget;
    },
  },

  Mutation: {
    createUser: async (
      parent,
      { username, email, password} //, incomes = [], expenses = [], savings = [] 
    ) => {
      //id is auto generated
      //incomes, expenses, and savings default to empty array if no inputs
      const user = await User.create({
        username,
        email,
        password,
        incomes: [],
        expenses: [],
        savingsGoal: [],
        budgets: []
      });
      //need to give the user a new token
      const token = signToken(user);
      return { token, user };
    },

    //login
    login: async (parent, { username, email, password }, context) => {
      //find user based on credentials
      //needs to be declared up here to be a valid call later
      let user;
      if (username) {
        user = await User.findOne({ username });
      } else if (email) {
        user = await User.findOne({ email });
      }

      if (!user) {
        //no user, either no username, email, or not found
        throw AuthenticationError;
      }

      //built in password checker
      const passCheck = await user.isCorrectPassword(password);
      if (!passCheck) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    //adding finances
    addIncome: async (parent, { newIncome }, context) => {
      console.log('Hi');
      try {
        // const userData = await User.findById(_id);
        // // console.log(userData.incomes);
        // // console.log(newIncome);
        // const newIncomeArray = userData.incomes;
        // newIncomeArray.push(newIncome);
        // // console.log(newIncomeArray);
        // const updatedUser = await User.findOneAndUpdate(
        //     {_id : _id},
        //     {$set: {incomes: newIncomeArray}},
        //     {new: true}
        // );
        // return updatedUser.incomes;
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { incomes: newIncome } },
          { new: true }
        );
        return updatedUser.incomes;
      } catch (err) {
        return [500, 500]; //the expected return is a float array
      }
    },
    addExpense: async (parent, { newExpense }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { expenses: newExpense } },
          { new: true }
        );
        return updatedUser.expenses;
      } catch (err) {
        return [500, 500]; //the expected return is a float array
      }
    },
    addSaving: async (parent, { newSaving }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savings: newSaving } },
          { new: true }
        );
        return updatedUser.savings;
      } catch (err) {
        return [500, 500]; //the expected return is a float array
      }
    },

    //changing finances
    changeIncomes: async (parent, { newIncomes }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { incomes: newIncomes } },
          { new: true }
        );
        return updatedUser.incomes;
      } catch (err) {
        return [500, 500]; //the expected return is a float array
      }
    },
    changeExpenses: async (parent, { newExpenses }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { expenses: newExpenses } },
          { new: true }
        );
        return updatedUser.expenses;
      } catch (err) {
        return [500, 500]; //the expected return is a float array
      }
    },
    changeSavings: async (parent, { newSavings }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { savings: newSavings } },
          { new: true }
        );
        return updatedUser.savings;
      } catch (err) {
        return [500, 500]; //the expected return is a float array
      }
    },

    //delete a user
    deleteUser: async (parent, args, context) => {
      const deletedUser = await User.findOneAndDelete({
        _id: context.user._id,
      });
      return deletedUser;
    },
  },
};

module.exports = resolvers;
