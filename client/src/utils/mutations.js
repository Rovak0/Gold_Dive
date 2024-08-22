import { gql } from "@apollo/client"

//adding a user
export const CREATE_USER = gql`
    mutation createUser(
            $username: String!, 
            $email: String!, 
            $password: String!,
            incomes: [Float],
            expenses: [Float],
            savings: [Float]
        ) {
            createUser(
                username: $username,
                email: $email,
                password: $password
            ) {
                    _id
                    username
                    email
                    password
            }
        }
`;


//adding finances
export const CREATE_INCOME = gql`
    mutation addIncome ($_id: String!, $newIncome: Float!) {
        addIncome(_id: $_id, newIncome: $newIncome) {
            #these are the returns
            _id
            username
            incomes
        }
    }
`;

export const CREATE_EXPENSE = gql`
    mutation addExpense ($_id: String!, $newExpense: Float!) {
        addExpense(_id: $_id, newExpense: $newExpense) {
            _id
            username
            expenses
        }
    }
`;

export const CREATE_SAVING = gql`
    mutation addSaving ($_id: String!, $newSaving: Float!) {
        addSaving(_id: $_id, newSaving: $newSaving) {
            _id
            username
            savings
        }
    }
`;


//changing finances
export const CHANGE_INCOMES = gql`
    mutation changeIncomes ($_id: String!, $newIncomes: [Float]!) {
        changeIncomes (_id: $_id, newIncomes: $newIncomes) {
            _id
            username
            incomes
        }
    }
`;

export const CHANGE_EXPENSES = gql`
    mutation changeExpenses ($_id: String!, $newExpenses: [Float]!) {
        changeExpenses (_id: $_id, newExpenses: $newExpenses) {
            _id
            username
            expenses
        }
    }
`;

export const CHANGE_SAVINGS = gql`
    mutation changeSavings ($_id: String!, $newSavings: [Float]!) {
        changeSavings (_id: $_id, newSavings: $newSavings) {
            _id
            username
            savings
        }
    }
`;

//deleting a user
export const DELETE_USER = gql`
    mutation deleteUser($_id: String!){
        deleteUser(_id: $_id){
            _id
            username
            email
        }
    }
`;