import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

import { QUERY_USER, QUERY_USERS } from '../utils/queries';
import {
  CREATE_INCOME, 
  CREATE_EXPENSE, 
  CREATE_SAVING,
  CHANGE_INCOMES,
  CHANGE_EXPENSES,
  CHANGE_SAVINGS
} from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  const profileId = Auth.getProfile().data._id;
  // const { profileId } = useParams();

  const [formState, setFormState] = useState({
    addIncome: '',
    addSaving: '',
    addExpense: '',    
    changeIncomes: '',
    changeSavings: '',
    changeExpenses: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  }

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_USER` query instead for the logged in user's information
  //there has to be a token, so always a profile unless the token expired.  If expired, send back to main
  if(!profileId){
    window.location.assign("/");
  };

  const {loading, data} = useQuery(QUERY_USER, {
    variables: {_id: profileId}
  });

  const [addIncome, {errorIncome, dataIncome}] = useMutation(CREATE_INCOME);
  const [addExpense, {errorExpense, dataExpense}] = useMutation(CREATE_EXPENSE);
  const [addSaving, {errorSaving, dataSaving}] = useMutation(CREATE_SAVING);

  const [changeIncome, {errorChangeIncome, dataChangeIncome}] = useMutation(CHANGE_INCOMES);
  const [changeExpense, {errorChangeExpense, dataChangeExpense}] = useMutation(CHANGE_EXPENSES);
  const [changeSaving, {errorChangeSaving, dataChangeSaving}] = useMutation(CHANGE_SAVINGS);

  const handleFormSubmitAddIncome = async (event) => {
    event.preventDefault();
    try{
      // console.log(typeof(formState.addIncome));
      const newIncome = parseFloat(formState.addIncome);
      // console.log(typeof(newIncome));
      const newIncomeData = await addIncome({
      // const x = await addIncome({
        variables: {newIncome}
      });
      // console.log(newIncomeData);
      // setFormState({
      //   ...formState,
      //   [formState.addIncome]: ''
      // });
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmitAddExpense = async (event) => {
    event.preventDefault();
    try{
      const newExpense = parseFloat(formState.addExpense);
      const expense = await addExpense({
        variables: {newExpense}
      })
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmitAddSaving = async (event) => {
    event.preventDefault();
    try{
      const newSaving = parseFloat(formState.addSaving);
      const saving = await addSaving({
        variables: {newSaving}
      })
    }
    catch (err) {
      console.log(err);
    }
  };


  // the changers
  const handleFormSubmitChangeIncome = async (event) => {
    event.preventDefault();
    try{
      const newIncomes = parseFloat(formState.changeIncomes);
      const newIncomeData = await changeIncome({
        variables: {newIncomes: [newIncomes]}
      });
      console.log(newIncomeData);
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmitChangeExpense = async (event) => {
    event.preventDefault();
    try{
      const newExpenses = parseFloat(formState.changeExpenses);
      const expense = await changeExpense({
        variables: {newExpenses: [newExpenses]}
      })
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmitChangeSaving = async (event) => {
    event.preventDefault();
    try{
      const newSavings = parseFloat(formState.changeSavings);
      const saving = await changeSaving({
        variables: {newSavings: [newSavings]}
      })

    }
    catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  // console.log(data);
  const user = data.user;
  // console.log(user);
  
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">
        {user.username}
      </h2>
    {/* I would like for these things to be inline, but can't make it work */}
      <div>
        <form onSubmit={handleFormSubmitAddIncome}>
          <input
            className="form-input"
            placeholder="Add an income"
            name="addIncome"
            type="text"
            value={formState.addIncome}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>

        <form onSubmit={handleFormSubmitAddExpense}>
          <input
            className="form-input"
            placeholder="Add an expense"
            name="addExpense"
            type="text"
            value={formState.addExpense}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>

        <form onSubmit={handleFormSubmitAddSaving}>
          <input
            className="form-input"
            placeholder="Add an saving"
            name="addSaving"
            type="text"
            value={formState.addSaving}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>


{/* the changers */}
<div>
        <form onSubmit={handleFormSubmitChangeIncome}>
          <input
            className="form-input"
            placeholder="Change an income"
            name="changeIncomes"
            type="text"
            value={formState.changeIncomes}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>

        <form onSubmit={handleFormSubmitChangeExpense}>
          <input
            className="form-input"
            placeholder="Change an expense"
            name="changeExpenses"
            type="text"
            value={formState.changeExpenses}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>

        <form onSubmit={handleFormSubmitChangeSaving}>
          <input
            className="form-input"
            placeholder="Change an saving"
            name="changeSavings"
            type="text"
            value={formState.changeSavings}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

    </div>
  );
};

export default Profile;
