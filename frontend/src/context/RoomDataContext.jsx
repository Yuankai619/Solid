import {
    createContext,
    useContext,
    useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "../context/UserInfoContext";
import { useAuth } from "../context/AuthContext";
import { useSystem } from "./SystemContext";
import { getInfo } from '../api/conversation/GetInfo';
import PropTypes from "prop-types";


const RoomDataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomData = () => useContext(RoomDataContext);

export function RoomDataProvider({ children }) {
    const { userInfo } = useUserInfo();
    const { curConversationId } = useSystem();
    const { googleId, token } = useAuth();
    const queryClient = useQueryClient();
    const userId = userInfo?._id;

    const {
        data: conversationInfo,
        isLoading: isConversationInfoLoading,
        isError: isConversationInfoError,
    } = useQuery({
        queryKey: ['conversationInfo', curConversationId],
        queryFn: async () => {
            const res = await getInfo(curConversationId, token);
            console.debug('conversationInfo:', res.data);
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!userId && !!token && curConversationId != undefined && curConversationId != null,
    })

    const value = {
        conversationInfo,
        isConversationInfoLoading,
        isConversationInfoError
    }
    return (
        <RoomDataContext.Provider value={value}>{children}</RoomDataContext.Provider>
    );
}

RoomDataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
