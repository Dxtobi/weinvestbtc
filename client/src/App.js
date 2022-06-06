import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";

import Private from "./components/routing/Private.js";
import Header from "./components/Sheared/Header";
import Plans from "./components/Dashboard/Plans";
import Adm from "./components/Adm";



function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='mt'>
      <Switch>
        <Route exact path="/" component={PrivateRoute} />
        <Private exact path="/dashboard" component={Dashboard} />
        <Private exact path="/adm" component={Adm} />
        
        <Route exact path="/plans" component={Plans} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/password-reset/:resetToken"
          component={ResetPassword}
        />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
