import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import register from './components/register';
import login from './components/login';
import protectedTEST from './components/protectedTEST';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
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
        <Route path="/register" component={register} />
        <Route path="/login" component={login} />
        <Route path="/protectedTEST" component={protectedTEST} />
      </div>
    </Router>
  );
}

export default App;
