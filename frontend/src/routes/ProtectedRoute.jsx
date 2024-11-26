import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();

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
