import {
    createContext,
    useContext,
    useState,
} from "react";
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useUserInfo } from "../context/UserInfoContext";
import { useAuth } from "../context/AuthContext";
import { useSystem } from "./SystemContext";
import { getInfo } from '../api/conversation/GetInfo';
import { getMessages } from "../api/message/GetMessages";
import { sendMessage } from "../api/message/SendMessage";
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
    const isEnable = !!userId && !!token && curConversationId != undefined && curConversationId != null;

    const {
        data: conversationInfo,
        isLoading: isConversationInfoLoading,
        isError: isConversationInfoError,
    } = useQuery({
        queryKey: ['conversationInfo', curConversationId],
        queryFn: async () => {
            const res = await getInfo(curConversationId, token);
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: isEnable,
        gcTime: 3000,
    })

    const {
        data: messagesData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingMessages,
        error: messagesError,
        refetch: refetchMessages,
    } = useInfiniteQuery({
        queryKey: ['messages', curConversationId],
        queryFn: async ({ pageParam }) => {
            const ret = await getMessages(
                curConversationId,
                pageParam,
                5,
                token
            );
            return {
                messages: ret.data.messages || [],
                pagination: {
                    currentPage: ret.data.currentPage || 1,
                    totalPages: ret.data.totalPages || 1,
                    hasMore: ret.data.hasMore || true
                }
            };
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage || !lastPage.pagination) return undefined;
            const currentPage = parseInt(lastPage.pagination.currentPage, 10);
            const totalPages = parseInt(lastPage.pagination.totalPages, 10);
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        enabled: isEnable,
    });

    const {
        mutateAsync: sendMessageMutation,
        isLoading: isSendingMessage,
        isSuccess: isSendMessageSuccess,
    } = useMutation({
        mutationFn: async (payload) => {
            const res = await sendMessage(
                payload,
                curConversationId,
                token,
            );
            return res.data;
        },
        onSuccess: (newMessage) => {
            queryClient.setQueryData(
                ['messages', curConversationId],
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = [...oldData.pages];
                    newPages[0] = {
                        ...newPages[0],
                        messages: [newMessage, ...newPages[0].messages]
                    };
                    return {
                        ...oldData,
                        pages: newPages
                    };
                }
            );
        },
        onError: (error) => {
            console.error('Failed to send message:', error);
            alert('Failed to send message. Please try again.');
            throw error;
        },
        ennabled: isEnable,
    });


    const allMessages = messagesData?.pages?.reduce((acc, page) => {
        if (page?.messages && Array.isArray(page.messages)) {
            return [...acc, ...page.messages];
        }
        return acc;
    }, []) ?? [];
    const value = {
        conversationInfo,
        isConversationInfoLoading,
        isConversationInfoError,
        messagesData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoadingMessages,
        messagesError,
        allMessages,
        refetchMessages,
        sendMessageMutation,
        isSendingMessage,
        isSendMessageSuccess
    }
    return (
        <RoomDataContext.Provider value={value}>{children}</RoomDataContext.Provider>
    );
}

RoomDataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
