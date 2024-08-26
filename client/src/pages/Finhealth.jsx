import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {QUERY_INCOMES} from '../utils/queries';
import {QUERY_EXPENSES} from '../utils/queries';
import {QUERY_SAVINGS} from '../utils/queries';

import Auth from '../utils/auth';

const Finhealth = () => {
  // console.log ("hello");
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  // const { financeId } = useParams();
  const financeId = Auth.getProfile().data._id;
  // console.log(financeId); 

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
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {finance.financeAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
           {finance.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {finance.financeText}
        </blockquote>
      </div>
    </div>
  );
};

export default Finhealth;


