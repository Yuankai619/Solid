import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { FindUser } from "../api/auth/FindUser";
const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading, googleId } = useAuth();
    console.log("ProtectedRoute googleId: ", googleId);
    const {
        data: findResult,
        isLoading: isFetching,
    } = useQuery({
        queryKey: ["findUser", googleId],
        queryFn: async () => {
            console.log("queryFn debug");
            const res = await FindUser(googleId);
            return res;
        },
        refetchOnWindowFocus: false,

    })


    console.log("ProtectedRoute findResult: ", findResult);
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
