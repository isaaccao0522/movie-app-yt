import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
//// Others
import { useAuth } from "../../context/useAuth";

const ProtectRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return <>{user ? children : <Navigate to={"/"} />}</>;
};

export default ProtectRoute;

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
