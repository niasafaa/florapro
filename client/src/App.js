import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const register = lazy(() => import('./components/register'));
const login = lazy(() => import('./components/login'));
const protectedTEST = lazy(() => import('./components/protectedTEST'));
const landingPage = lazy(() => import('./components/landingPage'));
const dashBoard = lazy(() => import('./components/dashboard/Dashboard.js'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <h1>FloraPRO</h1>
              <Link style={{ display: 'flex' }} to="/register">
                Register
              </Link>
              <Link style={{ display: 'flex' }} to="/login">
                Login
              </Link>
              <Link style={{ display: 'flex' }} to="/protectedTEST">
                Protected
              </Link>
              <Link style={{ display: 'flex' }} to="/landingPage">
                Landing Page
              </Link>
              <Link style={{ display: 'flex' }} to="/dashBoard">
                Dasboard
              </Link>
            </React.Fragment>
          )}
        />
        <Route exact path="/landingPage" component={landingPage} />
        <Route exact path="/register" component={register} />
        <Route exact path="/login" component={login} />
        <Route exact path="/protectedtest" component={protectedTEST} />
        <Route exact path="/dashBoard" component={dashBoard} />
      </Suspense>
    </Router>
  );
};

export default App;
