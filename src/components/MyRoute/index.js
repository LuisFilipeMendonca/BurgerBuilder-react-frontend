import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/Auth";

const MyRoute = ({ isClosed, isExact, ...rest }) => {
  const { auth } = useContext(AuthContext);

  if (isClosed && !auth.token) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} exact={isExact} />;
};

export default MyRoute;
