const {User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () =>{
            return await User.find();
        },
        user: async (parent, {_id}) => {
            return await User.findOne({_id: _id});
        },
        incomes: async (parent, {_id}) => {
            const user = await User.findOne({_id: _id});
            return user.incomes;
        },
        expenses: async (parent, {_id}) => {
            const user = await User.findOne({_id: _id});
            return user.expenses;
        },
        savings: async (parent, {_id}) => {
            const user = await User.findOne({_id: _id});
            return user.savings;
        }
    },

    Mutation: {
        createUser: async (parent, {username, email, password, incomes = [], expenses = [], savings = []}) => {
            //id is auto generated
            //incomes, expenses, and savings default to empty array if no inputs
            const user = await User.create({username, email, password, incomes, expenses, savings})
            //need to give the user a new token
            const token = signToken(user);
            return {token, user};
        },

        //login



        //adding finances
        addIncome: async (parent, {_id, newIncome})=> {
            try{
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
        changeIncomes: async (parent, {_id, newIncomes}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$set: {incomes: newIncomes}},
                    {new: true}
                );
                return updatedUser.incomes;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        changeExpenses: async (parent, {_id, newExpenses}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$set: {expenses: newExpenses}},
                    {new: true}
                );
                return updatedUser.expenses;
            }
            catch(err){
                return [500, 500]; //the expected return is a float array
            }
        },
        changeSavings: async (parent, {_id, newSavings}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    {_id : _id},
                    {$set: {savings: newSavings}},
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