import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from "./Components/Login";
import PrivateRoute from "./Utils/PrivateRoute";
import Dashboard from "./Components/Dashboard";


function App() {
  return (
    <Router>
      <nav>
        <h1>Friends List!</h1>
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;