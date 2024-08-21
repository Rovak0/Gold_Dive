const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        #all finances must be at least an empty array
        incomes: [Float]!
        expenses: [Float]!
        savings: [Float]!
    }

    type Query{
        #there is only query yourself
        user(_id: String!): User
        #Query finances
        incomes(_id: String!): [Float]
        expenses(_id: String!): [Float]
        savings(_id: String!): [Float]
    }

    type Mutation{
        #changes anything but id, username, password, email
        #so, changes finance
        #Does need to add users
        createUser(
            _id: String!, 
            username: String!, 
            email: String!, 
            password: String!,
            incomes: [Float],
            expenses: [Float],
            savings: [Float]
        ): User

        #adding finances
        addIncome(_id: String!, newIncome: Float!): [Float]
        addExpense(_id: String!, newExpense: Float!): [Float]
        addSaving(_id: String!, newSaving: Float!): [Float]

        #changing finances
        changeIncomes(_id: String!, newIncomes: [Float]!): [Float]
        changeExpenses(_id: String!, newExpenses: [Float]!): [Float]
        changeSavings(_id: String!, newSavings: [Float]!): [Float]

        #delete user
        #This return may be wrong
        deleteUser(_id: String!): User
    }

`;

module.exports = typeDefs;