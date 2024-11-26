import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();
    // const {
    //     data: findResult,
    // } = useQuery({
    //     queryKey: ["findUser", currentUser?.uid],
    //     queryFn: FindUser,
    //     enabled: !!currentUser,
    // })
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
