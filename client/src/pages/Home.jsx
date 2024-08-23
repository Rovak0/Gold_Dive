import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to Gold Dive!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Where you can jump into your finaces head first:</h2>
      </div>
      <div className="card-footer text-center m-3">
        <Link to="/Login">
          <button className="btn btn-lg btn-danger">LogIn</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
