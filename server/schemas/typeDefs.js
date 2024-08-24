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

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        #there is only query yourself
        users: [User]
        user(_id: String!): User
        #Query finances
        incomes: [Float]
        expenses: [Float]
        savings: [Float]
        budget: [Float]
        #the unused bits incase I need them back
        #_id: String! _id: String! _id: String! _id: String!
    }

    type Mutation{
        #changes anything but id, username, password, email
        #so, changes finance
        #Does need to add users
        createUser(
            username: String!, 
            email: String!, 
            password: String!,
            incomes: [Float],
            expenses: [Float],
            savings: [Float]
        ): Auth 
        login(username: String, email: String, password: String!): Auth


        #adding finances
        addIncome(newIncome: Float!): [Float]
        addExpense(newExpense: Float!): [Float]
        addSaving(newSaving: Float!): [Float]

        #changing finances
        changeIncomes(newIncomes: [Float]!): [Float]
        changeExpenses(newExpenses: [Float]!): [Float]
        changeSavings(newSavings: [Float]!): [Float]

        #delete user
        #This return may be wrong
        #this will delete the logged in user
        deleteUser: User
    }

`;

module.exports = typeDefs;
