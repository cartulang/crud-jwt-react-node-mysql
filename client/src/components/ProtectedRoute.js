import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useAuth();

  if (!isAuth) return <Redirect to="/" />;

  return <Route component={Component} {...rest} />;
};

export default ProtectedRoute;
