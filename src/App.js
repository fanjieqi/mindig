import React from 'react';
import WorkSpace from './components/WorkSpace';
import Login from './components/Login';
import Registration from './components/Registration';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route path="/workspace" component={WorkSpace}/>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Registration} />
    </Switch>
  </Router>
);

export default App;
