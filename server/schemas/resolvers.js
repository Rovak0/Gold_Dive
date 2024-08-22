const {User} = require('../models');

const resolvers = {
    Query: {
        users: async () =>{
            return User.find();
        },
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
        addIncome: async (parent, {_id, newIncome})=> {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$push: {incomes: newIncome}},
                    {new: true}
                );
                return updatedUser.incomes;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        addExpense: async (parent, {_id, newExpense})=> {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$push: {expenses: newExpense}},
                    {new: true}
                );
                return updatedUser.expenses;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        addSaving: async (parent, {_id, newSaving})=> {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$push: {savings: newSaving}},
                    {new: true}
                );
                return updatedUser.savings;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },

        //changing finances
        changeIncomes: async (parent, {_id, replacementIncomes}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$set: {incomes: replacementIncomes}},
                    {new: true}
                );
                return updatedUser.incomes;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        changeExpenses: async (parent, {_id, replacementExpenses}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$set: {expenses: replacementExpenses}},
                    {new: true}
                );
                return updatedUser.expenses;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        changeSavings: async (parent, {_id, replacementSavings}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$set: {savings: replacementSavings}},
                    {new: true}
                );
                return updatedUser.savings;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },

        //delete a user
        deleteUser: async (parent, {_id}) => {
            const deletedUser = await User.findOneAndDelete({_id: _id});
            return deletedUser;
        }
    }
};

module.exports = resolvers;