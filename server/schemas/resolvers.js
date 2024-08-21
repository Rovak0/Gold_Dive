const {User} = require('../models');

const resolvers = {
    Query: {
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId});
        },
        incomes: async (parent, {userId}) => {
            const user = User.findOne({_id: userId});
            return user.incomes;
        },
        expenses: async (parent, {userId}) => {
            const user = User.findOne({_id: userId});
            return user.expenses;
        },
        savings: async (parent, {userId}) => {
            const user = User.findOne({_id: userId});
            return user.savings;
        }
    },

    Mutation: {
        createUser: async (parent, {username, email, password, incomes = [], expenses = [], savings = []}) => {
            //id is auto generated
            //incomes, expenses, and savings default to empty array if no inputs
            const user = await User.create({username, email, password, incomes, expenses, savings})
            return user;
        },
        //adding finances
        addIncome: async (parent, {userId, newIncome})=> {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : userId},
                    {$addToSet: {income: newIncome}},
                    {new: true}
                );
                return updatedUser.incomes
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        addExpense: async (parent, {userId, newExpense})=> {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : userId},
                    {$addToSet: {expenses: newExpense}},
                    {new: true}
                );
                return updatedUser.expenses
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        addSaving: async (parent, {userId, newSaving})=> {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : userId},
                    {$addToSet: {savings: newSaving}},
                    {new: true}
                );
                return updatedUser.savings
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },

        //changing finances
        changeIncomes: async (parent, {userId, replacementIncomes}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : userId},
                    {$set: {incomes: replacementIncomes}},
                    {new: true}
                );
                return updatedUser.incomes
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        changeExpenses: async (parent, {userId, replacementExpenses}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : userId},
                    {$set: {expenses: replacementExpenses}},
                    {new: true}
                );
                return updatedUser.expenses
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        changeSavings: async (parent, {userId, replacementSavings}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : userId},
                    {$set: {savings: replacementSavings}},
                    {new: true}
                );
                return updatedUser.savings
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },

        //delete a user
        deleteUser: async (parent, {userId}) => {
            const deletedUser = await User.findOneAndDelete({_id: userId});
            return deletedUser;
        }
    }
};

module.exports = resolvers;