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
    query user($_id: String!) {
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
    query incomes{
        incomes 
    }
`;

export const QUERY_EXPENSES = gql`
    query expenses{
        expenses
    }
`;

export const QUERY_SAVINGS = gql`
query savings{
    savings
}
`;