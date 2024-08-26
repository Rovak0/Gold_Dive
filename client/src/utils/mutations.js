import { gql } from "@apollo/client";

//adding a user
export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $incomes: [Float]
    $expenses: [Float]
    $savings: [Float]
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      incomes: $incomes
      expenses: $expenses
      savings: $savings
    ) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String, $email: String, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }
`;

//adding finances
export const CREATE_INCOME = gql`
  mutation addIncome($newIncome: Float!) {
    addIncome(newIncome: $newIncome)
  }
`;

export const CREATE_EXPENSE = gql`
  mutation addExpense($newExpense: Float!) {
    addExpense(newExpense: $newExpense) 
  }
`;

export const CREATE_SAVING = gql`
  mutation addSaving($newSaving: Float!) {
    addSaving(newSaving: $newSaving) 
  }
`;

//changing finances
export const CHANGE_INCOMES = gql`
  mutation changeIncomes($newIncomes: [Float]!) {
    changeIncomes(newIncomes: $newIncomes) {
      _id
      username
      incomes
    }
  }
`;

export const CHANGE_EXPENSES = gql`
  mutation changeExpenses($newExpenses: [Float]!) {
    changeExpenses(newExpenses: $newExpenses) {
      _id
      username
      expenses
    }
  }
`;

export const CHANGE_SAVINGS = gql`
  mutation changeSavings($newSavings: [Float]!) {
    changeSavings( newSavings: $newSavings) 
  }
`;

//deleting a user
export const DELETE_USER = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
      username
      email
    }
  }
`;
