import {
    useState,
    createContext,
    useContext,
    useEffect,
} from "react";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { FindUser } from "../api/auth/FindUser";
import PropTypes from "prop-types";


const UserInfoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => useContext(UserInfoContext);

export function UserInfoProvider({ children }) {
    const { googleId, token } = useAuth();

    const {
        data: userInfo,
        refetch: refetchUserInfo,
    } = useQuery({
        queryKey: ["UserInfo", googleId],
        queryFn: async () => {
            try {
                const info = await FindUser(googleId, token);
                return info;
            } catch (error) {
                console.error("Find user error: ", error);
            }
        },
        enabled: !!googleId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: Infinity,

    });

    useEffect(() => {
        console.log("UserInfoProvider mounted");
        if (googleId || userInfo) {
            refetchUserInfo();
        }
    }, [googleId, refetchUserInfo, userInfo]);

    const value = {
        userInfo,
        refetchUserInfo,
    };

    return (
        <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>
    );
}

UserInfoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
