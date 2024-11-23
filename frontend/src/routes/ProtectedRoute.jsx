import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";
const ProtectedRoute = ({ children }) => {
    const user = auth.currentUser;
    const { currentUser } = useAuth();
    const location = useLocation();
    console.log("currentUser = ", user);
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
