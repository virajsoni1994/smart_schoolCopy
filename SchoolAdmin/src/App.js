import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./css/style.css";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

// Containers
import { DefaultLayout } from "./containers";

import { Login } from "./components";
import Dashboard from "./views/Dashboard/Dashboard";

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Redirect from="/" to="/login" push /> */} */}
          {/* <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} /> */}
          <Route path="/" name="Home" component={DefaultLayout} />
          <Route path="/dashboard" name="Dashboard" component={Dashboard} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
