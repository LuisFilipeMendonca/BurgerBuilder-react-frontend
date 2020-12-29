import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/Auth";

const MyRoute = ({ isClosed, component, isExact, path }) => {
  const { auth } = useContext(AuthContext);

  if (isClosed && !auth.token) {
    return <Redirect to="/login" />;
  }

  return <Route path={path} component={component} exact={isExact} />;
};

export default MyRoute;
