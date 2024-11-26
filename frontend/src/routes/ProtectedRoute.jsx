import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { FindUser } from "../api/auth/FindUser";
const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading, googleId, token } = useAuth();

    const {
        data: findResult,
        isLoading: isFetching,
    } = useQuery({
        queryKey: ["findUser", googleId],
        queryFn: async () => {
            const res = await FindUser(googleId, token);
            return res;
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,

    })


    if (isLoading || isFetching) {
        return <div>loadiing....</div>;
    } else if (!currentUser) {
        return <Navigate to="/login" replace />;
    } else if (findResult === "false") {
        return <Navigate to="/signup" replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
