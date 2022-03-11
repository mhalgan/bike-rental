import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { authSelectors } from "../../redux/auth";

const ProtectedRoute = ({ children }) => {
  const authUser = useSelector(authSelectors.getUser);
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
