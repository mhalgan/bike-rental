import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { authSelectors } from "../../redux/auth";

const ProtectedRoute = ({ children, managerOnly }) => {
  const token = useSelector(authSelectors.getToken);
  const isManager = useSelector(authSelectors.isManager);
  const location = useLocation();

  if (!token || (managerOnly && !isManager)) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  managerOnly: PropTypes.bool,
};

export default ProtectedRoute;
