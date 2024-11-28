import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "../context/UserInfoContext";
import { useAuth } from "../context/AuthContext";
import { getOwnerConversations } from "../api/conversation/GetOwnerConversations";
import { createConversation } from "../api/conversation/CreateConversation";
import PropTypes from "prop-types";

const ConversationContext = createContext();

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }) => {

    const { userInfo } = useUserInfo();
    const { token } = useAuth();
    const queryClient = useQueryClient();
    const userId = userInfo?._id;

    //cache key
    const CONVERSATIONS_QUERY_KEY = ['conversations', userId];

    const {
        data: createdConversations = [],
        isLoading,
        refetch: refetchCreatedConversations,
    } = useQuery({
        queryKey: CONVERSATIONS_QUERY_KEY,
        queryFn: async () => {
            const ret = await getOwnerConversations(userId, token);
            console.log("getOwnerConversations:", ret);
            return ret.data;
        },
        enabled: !!userId && !!token,
        staleTime: Infinity,

    });
    const {
        mutateAsync: handleCreateConversation,
    } = useMutation({
        mutationFn: async (payload) => {
            const res = await createConversation(payload, token);
            return res;
        },
        onSuccess: (res) => {
            queryClient.setQueryData(CONVERSATIONS_QUERY_KEY, (old) => {
                return [res.data, ...old];
            });
        },
        onError: (error) => {
            console.error("Create conversation error:", error);
        },
    });


    const value = {
        createdConversations,
        isLoading,
        refetchCreatedConversations,
        handleCreateConversation,
    };
    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    );
};

ConversationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
