import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import io from 'socket.io-client'
import StreamJoinedMessageCardTheme from '../themes/StreamJoinedMessageCardTheme';
let socket = io.connect(`${process.env.REACT_APP_API_URL}`)

function StreamJoinedMessageCard({ data, classID, setMessageData }) {
    useEffect(() => {
        socket.emit('join_room', classID);
        socket.on('refresh', (data) => {
            console.log(data);
        })
    }, [socket])
    const [isMyMessage, setIsMyMessage] = useState(true); //比對message的userID是不是==自己的userID
    const [isShowScore, setIsShowScore] = useState(false); //要不要顯示score
    const [selected, setSelected] = useState(data.score); // Keep track of which button is selected    
    const [currentUserId, setCurrentUserId] = useState('');
    let a;
    useEffect(() => {
        async function fetchData() {
            await GetUserInfo();
        }
        fetchData();
    }, []); // 確保只在組件掛載時調用一次
    const GetUserInfo = async () => {
        try {
            const res = await axios({
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                url: `${process.env.REACT_APP_API_URL}/api/getUserInfo`
            });
            console.log('get', res.data._id);
            setCurrentUserId(res.data._id);
            setIsMyMessage(res.data._id === data.userID);

        } catch (error) {
            console.error('Error in GetUserInfo:', error);
        }
    };

    useEffect(() => {
        if (data.score == 'null') {
            setIsShowScore(false);
        } else {
            setIsShowScore(true);
        }
        console.log(currentUserId);
    }, [data.score, isMyMessage]);
    console.log('pp', isShowScore);

    console.log('a', data.score)

    const correctEnable = "#3DECAD", correctDisable = "#00764B";
    const incorrectEnable = "#EE592A", incorrectDisable = "#76270E";

    const avatarSrc = data.isAnonymous === 'true' ? undefined : data.userimg;
    const username = data.isAnonymous === 'true' ? 'Anonymous' : data.username;

    const handleDeleteMessage = async () => {//要記得寫setMessageData
        try {
            const response = await axios({
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                data: JSON.stringify({
                    classID: classID,
                    messageID: data.messageid
                }),
                withCredentials: true,
                url: `${process.env.REACT_APP_API_URL}/course/deleteMessage`
            });
            if (!response) console.log('error');
            else console.log(response);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
        console.log("delete message");
        socket.emit('send_message', classID);
        setAnchorEl(null);
    };
    const [anonymousState, setAnonymousState] = useState(data.isAnonymous);

    const handleChangeAnonymousState = async () => {
        try {
            const response = await axios({
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                data: JSON.stringify({
                    classID: classID,
                    messageID: data.messageid,
                    isAnonymous: data.isAnonymous
                }),
                withCredentials: true,
                url: `${process.env.REACT_APP_API_URL}/course/setAnonymous`
            });
            if (!response) console.log('error');
            else console.log(response);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
        console.log("setAnonymous message");
        socket.emit('send_message', classID);
    }

    const handleChangeAnonymous = (event) => {
        event.stopPropagation();
        handleChangeAnonymousState();
        setAnonymousState(!anonymousState);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        // setAllowNavigate(false); // 打开 Menu 时禁止跳转F
    };
    const handleClose = () => {
        setAnchorEl(null);
        // setAllowNavigate(true);
    };
    return (
        <ThemeProvider theme={StreamJoinedMessageCardTheme}>
            <Card variant='outlined'>
                <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mx: "10px", width: '28px', height: '28px' }} src={avatarSrc} />
                        <Typography variant="subtitle1" >
                            {username}
                        </Typography>
                        {isShowScore &&
                            <Button aria-label="scroeState"
                                // onClick={() => handleButtonClick('incorrect')}
                                sx={{
                                    background: data.score == 'correct' ? correctEnable : incorrectEnable,
                                    '&:hover': {
                                        background: data.score == 'correct' ? correctEnable : incorrectEnable, // 确保鼠标悬浮时的背景色与点击时相同
                                    },
                                }}
                            // disabled={selected==='null'}
                            >
                            </Button>
                        }
                        {isMyMessage &&
                            <IconButton aria-label="menu"
                                // onClick={() => handleButtonClick('incorrect')}
                                sx={{
                                    background: "#222222",
                                    '&:hover': {
                                        background: "#222222", // 确保鼠标悬浮时的背景色与点击时相同
                                    },
                                }}
                                //disabled={selected === 'null'}
                                onClick={handleClickMenu}
                            >
                                <MoreHorizIcon sx={{ color: "#999999" }} />
                            </IconButton>
                        }
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: '#333333',
                                    color: 'white',
                                },
                            }}
                        >
                            <MenuItem onClick={handleChangeAnonymous}>{anonymousState == false ? 'Not Anonymous' : 'Set Anonymous'}</MenuItem>
                            <MenuItem onClick={handleDeleteMessage} sx={{ color: "#CC0000" }}>Delete</MenuItem>
                        </Menu>
                    </div>
                    <Typography variant="body1">
                        {data.message}
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}

export default StreamJoinedMessageCard;