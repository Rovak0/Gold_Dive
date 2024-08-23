import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Finhealth from './pages/Finhealth';
import Account from './pages/Account';
import NotFound from './pages/Notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/Login',
        element: <Login />
      },{
        path: '/Signup',
        element: <Signup />
      },{
        path: '/Finhealth/:financeId',
        element: <Finhealth />
      },{
        path: '/Account',
        element: <Account />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
