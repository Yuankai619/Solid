import React, { useState, useEffect, useRef } from 'react';
import StreamInputPanel from '../components/StreamInputPanel';
import StreamAppBar from '../components/StreamAppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useLocation } from 'react-router-dom';
import LoginChecker from '../checker/LoginChecker';
import { useNavigate } from 'react-router-dom';
import StreamEditorMessageCard from '../components/StreamEditorMessageCard';
import { useRoomData } from '../context/RoomDataContext';
import { useSystem } from '../context/SystemContext';
import io from 'socket.io-client'
import { useAuth } from '../context/AuthContext';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';

// let socket = io.connect(`${import.meta.env.REACT_APP_API_URL}`)

function Discussion() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { curConversationId, setCurConversationId } = useSystem();
    const location = useLocation();
    const conversationId = location.pathname.split('/')[2];
    const containerRef = useRef(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isSendMessage, setIsSendMessage] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const queryClient = useQueryClient();
    const {
        conversationInfo,
        isConversationInfoLoading,
        isConversationInfoError,
        allMessages,
        isLoadingMessages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useRoomData();

    // 設置 intersection observer
    const { ref, inView } = useInView({
        // threshold: 0.1, // 當元素出現 10% 時觸發
        // rootMargin: '100px 0px', // 提前 100px 觸發

    });

    useEffect(() => {
        setCurConversationId(conversationId);
        console.debug("set curConversationId: ", curConversationId);

    }, [conversationId, setCurConversationId, curConversationId, fetchNextPage]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.background = "#444";
    }, []);

    useEffect(() => {
        if (!containerRef.current || allMessages.length === 0) return;

        if (isInitialLoad) {
            console.debug("isInitialLoad: ", isInitialLoad);
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
            setIsInitialLoad(false);
        }
    }, [allMessages.length, isInitialLoad]);


    console.debug("inView: ", inView, "hasNextPage: ", hasNextPage);
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            console.debug("isFetchingNextPage: ", isFetchingNextPage);
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    // useEffect(() => {
    //     if (inView && hasNextPage && !isFetchingNextPage) {
    //         const currentScrollPosition = containerRef.current?.scrollTop || 0;
    //         fetchNextPage().then(() => {
    //             // 保持滾動位置
    //             if (containerRef.current) {
    //                 const newScrollHeight = containerRef.current.scrollHeight;
    //                 const oldScrollHeight = containerRef.current.scrollTop + containerRef.current.clientHeight;
    //                 containerRef.current.scrollTop = newScrollHeight - oldScrollHeight + currentScrollPosition;
    //             }
    //         });
    //     }
    // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    const handleScroll = (e) => {
        const container = containerRef.current;
        if (!container || isFetchingNextPage) return;

        setScrollPosition(container.scrollTop);
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
            console.log("scrollToBottom");
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    // useEffect(() => {
    //     scrollToBottom();
    // }, [isSendMessage]);

    if (curConversationId == undefined || curConversationId == null || isConversationInfoLoading || conversationInfo == undefined) {
        return <div>Loading...</div>
    }
    if (isConversationInfoError) {
        navigate("/home");
    }

    const { state } = conversationInfo;



    // useEffect(() => {
    //     socket.emit('join_room', ClassID);
    //     socket.on('refresh', (data) => {
    //         setTimeout(function () {
    //             // 在這裡寫入您希望在等待後執行的程式碼
    //             fetchClassData();
    //             //console.log('0.1 秒已過');
    //         }, 120);
    //         //    document.location.reload();
    //     })
    // }, [socket]);



    // console.log("fetch ClassData.State: ", classData.state)

    return (
        <div style={{ padding: 0, margin: "0px", }}>
            <StreamAppBar data={conversationInfo} />
            <div style={{ paddingTop: '70px' }}>
                <Container
                    sx={{
                        position: 'fixed',
                        height: (state === 'true' ? '61dvh' : '90dvh'),
                        overflow: "auto", px: "0px", marginButtom: "32px",
                        // display: "flex",
                        // flexDirection: "column-reverse",
                    }}
                    // onScroll={handleScroll}
                    maxWidth="100%"
                >
                    {(hasNextPage) && (
                        <div ref={ref} style={{ backgroundColor: "red", paddingButtom: "200px" }}>
                            {isFetchingNextPage && 'Loading more...'}
                        </div>
                    )}


                    {allMessages.map((message, index) => (
                        <StreamEditorMessageCard
                            key={index}
                            data={message}
                            classID={conversationId}
                        />
                    ))}

                </Container>
            </div>
            {/* {state === "true" && <StreamInputPanel handleSendMessage={setIsSendMessage} />} */}

        </div >
    );

}
export default Discussion;
