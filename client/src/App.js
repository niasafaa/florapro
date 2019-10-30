import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const register = lazy(() => import('./components/register'));
const login = lazy(() => import('./components/login'));
const protectedTEST = lazy(() => import('./components/protectedTEST'));


function App() {
  return (
    <Router>
      <Suspense fallback ={<div>Loading...</div>}>
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
            </React.Fragment>
          )}
        />
        <Route exact path="/register" component={register}/>
        <Route exact path="/login" component={login}/>
        <Route exact path="/protectedtest" component={protectedTEST}/>
      </Suspense>
    </Router>
  );
}

export default App;
