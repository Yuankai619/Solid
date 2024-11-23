import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";
const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();
    const location = useLocation();

    console.log("ProtectedRoute currentUser: ", currentUser);
    if (isLoading) {
        return <div>loadiing....</div>;
    } else if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
