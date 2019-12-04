import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const register = lazy(() => import('./components/register'));
const login = lazy(() => import('./components/login'));
const protectedDash = lazy(() => import('./components/protectedDash'));
const landingPage = lazy(() => import('./components/landingPage'));
const dashBoard = lazy(() => import('./components/dashboard/Dashboard.js'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/" render={() => <Redirect to="/landingPage" />} />
        <Route exact path="/landingPage" component={landingPage} />
        <Route exact path="/register" component={register} />
        <Route exact path="/login" component={login} />
        <Route exact path="/protecteddash" component={protectedDash} />
        <Route exact path="/dashBoard" component={dashBoard} />
      </Suspense>
    </Router>
  );
};

export default App;
