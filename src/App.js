import React from 'react';
import WorkSpace from './components/WorkSpace';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route path="/workspace" component={WorkSpace}>
      </Route>

      <Route path="/login" component={Login}>
      </Route>
    </Switch>
  </Router>
);

export default App;
