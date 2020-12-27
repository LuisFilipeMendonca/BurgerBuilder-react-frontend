import { Switch, Route } from "react-router-dom";

import "./style.css";

import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>
  );
};

export default Routes;
