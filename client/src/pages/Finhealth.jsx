import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import {QUERY_INCOMES} from '../utils/queries';
import {QUERY_EXPENSES} from '../utils/queries';
import {QUERY_SAVINGS} from '../utils/queries';

import Auth from '../utils/auth';

const Finhealth = (props) => {
  // console.log ("hello");
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  // const { financeId } = useParams();
  const financeId = Auth.getProfile().data._id;
  // console.log(financeId, "Id"); 

  // console.log(QUERY_INCOMES);

  const { loading:loadingIncomes, data:dataIncomes, error } = useQuery(QUERY_INCOMES);


  const { loading:loadingExpenses, data:dataExpenses } = useQuery(QUERY_EXPENSES, {
    // pass URL parameter
    // variables: { financeId: financeId },
  });

  const { loading:loadingSavings, data:dataSavings } = useQuery(QUERY_SAVINGS, {
    // pass URL parameter
    // variables: { financeId: financeId },
  });
  // console.log(error);
  // console.log(dataIncomes);

  const finance = {};

  
  finance.savings = dataSavings?.savings|| {};
  finance.expenses = dataExpenses?.expenses|| {};
  finance.incomes= dataIncomes?.incomes|| {};
  
  console.log(finance);

  if (loadingSavings || loadingIncomes || loadingExpenses) {
    return <div>Loading...</div>;
  }

  // what to do if the queries are successful, but there is no data
    //check to see if each one exists, and if it doesn't make it an empty array
  // if(!finance.incomes){
  //   finance.incomes = ['No incomes found'];
  // }
  // if(!finance.expenses){
  //   finance.expenses = ['No expenses found'];
  // }
  // if(!finance.savings){
  //   finance.savings = ['No savings found'];
  // }
  // console.log(finance, "finance");

  return (
    <div>
      <div className='card'> 
        <h2>Incomes</h2>
        <ul className="list-group">
        {finance.incomes.map(cashsource => (
        <li className="list-group-item">
          {cashsource}
      </li>
      ))}
      </ul>
    </div>

    <div className='card'>
      <h2>Expenses</h2>
      <ul className="list-group">
      {finance.expenses.map(cashdrain => (
      <li className="list-group-item">
        {cashdrain}
      </li>
      ))}
      </ul>
    </div>

    <div className='card'>
      <h2>Savings</h2>
      <ul className="list-group">
      {finance.savings.map(cashstorage => (
      <li className="list-group-item">
        {cashstorage}
      </li>
      ))}
      </ul>
    </div>

        <Link to= "/Account">
          <button className="btn btn-block btn-info">Account</button>
        </Link>
     </div>
    
  );
};

export default Finhealth;


