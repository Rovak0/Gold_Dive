import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            incomes
            expenses
            savings
        }
    }
`;


export const QUERY_USER = gql`
    query user($_id: String) {
        user(_id: $_id) {
            _id
            username
            email
            incomes
            expenses
            savings
        }
    }
`;


export const QUERY_INCOMES = gql`
    query incomes($_id: String){
        incomes(_id: $_id) {
            username
            incomes
        }
    }
`;

export const QUERY_EXPENSES = gql`
    query expenses($_id: String){
        expenses(_id: $_id) {
            username
            expenses
        }
    }
`;export const QUERY_SAVINGS = gql`
query savings($_id: String){
    savings(_id: $_id) {
        username
        savings
    }
}
`;