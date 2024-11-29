import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "../context/UserInfoContext";
import { useAuth } from "../context/AuthContext";
import { getOwnerConversations } from "../api/conversation/GetOwnerConversations";
import { getParticipantConversation } from "../api/conversation/GetParticipantConversation";
import { joinConversation } from "../api/conversation/JoinConversation";
import { createConversation } from "../api/conversation/CreateConversation";
import { deleteConversation } from "../api/conversation/DeleteConversation";
import PropTypes from "prop-types";

const ConversationContext = createContext();

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }) => {

    const { userInfo } = useUserInfo();
    const { googleId, token } = useAuth();
    const queryClient = useQueryClient();
    const userId = userInfo?._id;

    //cache key
    const CREATED_CONVERSATIONS_QUERY_KEY = ['createdConversations', userId];
    const JOINED_CONVERSATIONS_QUERY_KEY = ['joinedConversations', userId];

    //get joined conversations
    const {
        data: joinedConversations = [],
        isLoading: joinedConversationsLoading,
        refetch: refetchJoinedConversations,
    } = useQuery({
        queryKey: JOINED_CONVERSATIONS_QUERY_KEY,
        queryFn: async () => {
            const ret = await getParticipantConversation(userId, token);
            return ret.data;
        },
        enabled: !!userId && !!token,
        staleTime: Infinity,

    });

    //get created conversations
    const {
        data: createdConversations = [],
        isLoading: createdConversationsLoading,
        refetch: refetchCreatedConversations,
    } = useQuery({
        queryKey: CREATED_CONVERSATIONS_QUERY_KEY,
        queryFn: async () => {
            const ret = await getOwnerConversations(userId, token);
            return ret.data;
        },
        enabled: !!userId && !!token,
        staleTime: Infinity,

    });

    //join conversation
    const {
        mutateAsync: handleJoinConversation,
    } = useMutation({
        mutationFn: async (conversationId) => {
            const res = await joinConversation(conversationId, userId, token);
            return res;
        },
        onSuccess: (res) => {
            queryClient.setQueryData(JOINED_CONVERSATIONS_QUERY_KEY, (old) => {
                old = old || [];
                return [res.data, ...old];
            });
        },
        onError: (error) => {
            console.error("Join conversation error:", error);
            alert(error.response.data.message);
        },
    });

    //create conversation
    const {
        mutateAsync: handleCreateConversation,
    } = useMutation({
        mutationFn: async (payload) => {
            const res = await createConversation(payload, token);
            return res;
        },
        onSuccess: (res) => {
            queryClient.setQueryData(CREATED_CONVERSATIONS_QUERY_KEY, (old) => {
                old = old || [];
                return [res.data, ...old];
            });
        },
        onError: (error) => {
            console.error("Create conversation error:", error);
            alert("Create conversation error,please try again later");
        },
    });

    //delete conversation
    const {
        mutateAsync: handleDeleteConversation,
    } = useMutation({
        mutationFn: async (conversationId) => {
            const res = await deleteConversation(userId, conversationId, googleId, token);
            console.log("deleteConversation res:", res);
            return res.data._id;
        },
        onSuccess: (res) => {
            queryClient.setQueryData(CREATED_CONVERSATIONS_QUERY_KEY, (old) => {
                return old.filter((item) => item._id !== res);
            });
        },
        onError: (error) => {
            console.error("Delete conversation error:", error);
            alert("Delete conversation error,please try again later");
            throw error;
        },
    });

    const value = {
        joinedConversations,
        joinedConversationsLoading,
        refetchJoinedConversations,
        createdConversations,
        createdConversationsLoading,
        refetchCreatedConversations,
        handleJoinConversation,
        handleCreateConversation,
        handleDeleteConversation,
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
