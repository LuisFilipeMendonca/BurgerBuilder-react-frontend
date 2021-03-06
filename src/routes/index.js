import { Switch } from "react-router-dom";

import "./style.css";

import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";
import OrdersPage from "../pages/Orders";
import PurchasePag from "../pages/Purchase";

import MyRoute from "../components/MyRoute";

const Routes = () => {
  return (
    <Switch>
      <MyRoute path="/" component={MainPage} exact />
      <MyRoute path="/login" component={LoginPage} />
      <MyRoute path="/orders" component={OrdersPage} isClosed />
      <MyRoute path="/purchase" component={PurchasePag} />
    </Switch>
  );
};

export default Routes;
