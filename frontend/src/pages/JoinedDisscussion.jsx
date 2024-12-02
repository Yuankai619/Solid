import React, { useState, useEffect, useRef } from 'react';
import StreamInputPanel from '../components/StreamInputPanel';
import StreamAppBar from '../components/StreamAppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useLocation } from 'react-router-dom';
import { useRoomData } from '../context/RoomDataContext';
import { useNavigate } from 'react-router-dom';
import StreamJoinedMessageCard from '../components/StreamJoinedMessageCard';
import { useInView } from 'react-intersection-observer';
import { useSystem } from '../context/SystemContext';
import io from 'socket.io-client'
// let socket = io.connect(`${import.meta.env.REACT_APP_API_URL}`)

function JoinedDisscussion() {
    const navigate = useNavigate();
    const { curConversationId, setCurConversationId } = useSystem();
    const location = useLocation();
    const conversationId = location.pathname.split('/')[2];
    const containerRef = useRef(null);
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

    const { ref, inView } = useInView({});

    useEffect(() => {
        setCurConversationId(conversationId);
    }, [conversationId, setCurConversationId, curConversationId, fetchNextPage]);
    // const joinRoom = () => {
    //     socket.emit('join_room', ClassID);
    // }


    // useEffect(() => {
    //     joinRoom();
    //     socket.on('refresh', (data) => {
    //         setTimeout(function () {
    //             // 在這裡寫入您希望在等待後執行的程式碼
    //             fetchClassData();
    //             //console.log('0.1 秒已過');
    //         }, 150);
    //         //    document.location.reload();
    //     })
    // }, [socket]);


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.background = "#444";
    }, []);
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (curConversationId == undefined || curConversationId == null || isConversationInfoLoading || conversationInfo == undefined) {
        return <div>Loading...</div>
    }
    if (isConversationInfoError) {
        navigate("/home");
    }
    const { state } = conversationInfo;
    const scrooToBottom = () => {
        containerRef.current.scrollTop = 0;
    }
    return (
        <div style={{ padding: 0, margin: "0px" }}>
            <StreamAppBar data={conversationInfo} />
            <div style={{ paddingTop: '70px' }}>
                <Container
                    ref={containerRef}
                    sx={{
                        position: 'fixed',
                        height: (state === 'true' ? '61dvh' : '90dvh'),
                        overflow: "auto", px: "0px", marginButtom: "32px",
                        display: "flex",
                        flexDirection: "column-reverse",
                    }}
                    maxWidth="100%"
                >
                    {allMessages.map((message, index) => (

                        <StreamJoinedMessageCard
                            key={index}
                            data={message}
                            classID={conversationId}
                        />
                    ))}
                    {(hasNextPage) && (
                        <div ref={ref} style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                            {isFetchingNextPage && 'Loading more...'}
                        </div>
                    )}
                </Container>
            </div>

            {(state == 'true') &&
                <StreamInputPanel handleSendEvent={scrooToBottom} />
            }
        </div>
    );

}
export default JoinedDisscussion;
