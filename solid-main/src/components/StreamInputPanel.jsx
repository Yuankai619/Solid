import React, { useEffect, useState } from 'react';
import { Paper, TextField, IconButton, Switch, FormControlLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import io from 'socket.io-client'
let socket = io.connect('http://localhost:5000')

function StreamInputPanel({ classID }) {
    //stream data
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    //
    const [inputFocused, setInputFocused] = useState(false);
    const [sendIconColor, setSendIconColor] = useState('#EEEEEE');

    const [room ,setRoom] = useState(''); 
    const joinRoom = () =>{
        socket.emit('join_room',classID);
    }

    useEffect(()=>{
        joinRoom();
        socket.on('refresh',(data)=>{
            console.log(data);
        })
    },[socket])

    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(content);
        console.log(isAnonymous);
        console.log(classID);
        //add comment
        axios({
            method: "POST",
            headers: { 'Content-Type': 'application/json', },  
            data: JSON.stringify({
                classID : classID,
                isAnonymous : isAnonymous,
                message : content,
                score : "null"
            }),
            withCredentials: true,
            url: "http://localhost:4000/course/sendMessage"
        })  
        .then((res) =>{
            // comment here
            setContent('');//clear inputext
            // .json({  message: '訊息已成功加入',messageId: _uuid })
            console.log(res.data)
            
        })
        .catch((error) => { console.error(error); });
        socket.emit('send_message',classID);
    };
    
    const handleToggleChange = (event) => {
        setSendIconColor(sendIconColor === '#2D6CB6' ? '#EEEEEE' : '#2D6CB6');
        setIsAnonymous(event.target.checked);
    };
    const handleInputFocus = (e) => {
        e.stopPropagation();
        setInputFocused(true);
    };
    const handleInputBlur = (e) => {
        e.stopPropagation();
        setInputFocused(false);
    };
    const PrebuildDialogTheme = createTheme({
        typography: {
            fontFamily: [
                'Poppins',
                'sans-serif',
            ].join(','),
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInput-underline:before': {
                            borderBottomColor: '#EEEEEE', // 在這裡替換為你想要的邊框顏色
                        },
                        '& .MuiInput-underline:hover:before': {
                            borderBottomColor: '#222222', // 鼠標懸停時的邊框顏色
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#999999',
                            },
                            '&:hover fieldset': {
                                borderColor: '#999999',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#999999',
                            },
                        },
                    },
                },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    root: {
                        '& .MuiFormControlLabel-label': {
                            color: '#EEEEEE',
                        },
                    },
                },
            },
        }
    });
    return (
        <ThemeProvider theme={PrebuildDialogTheme}>
            <Paper style={{
                position: 'fixed',
                backgroundColor: '#222222',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0px 20px 20px 20px',
                transition: 'all 0.3s ease',
                transform: inputFocused ? 'translateTop(-50%)' : 'translateY(0)'
            }}>

                <TextField
                    multiline
                    rows={inputFocused ? 4 : 2}
                    placeholder="type...?"
                    variant="outlined"
                    fullWidth
                    value={content}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={{
                        margin: '10px 0',
                    }}
                    InputProps={{
                        style: {
                            padding: '15px', // 這裡增加padding來調整文字和框的間距
                            color: '#EEEEEE',
                        },
                    }}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: "0px 6px 0px 20px" }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAnonymous}
                                onChange={handleToggleChange}
                                name="anonymous"
                            />
                        }
                        label="Anonymous"
                    />
                    <IconButton aria-label="send" onClick={handleSubmit} disabled={content.length==0}>
                        <SendIcon sx={{ color: sendIconColor }}/>
                    </IconButton>
                </div>
                {/* <IconButton aria-label="send">
                {isAnonymous ? <VisibilityOffIcon /> : <SendIcon />}
            </IconButton> */}
            </Paper>
        </ThemeProvider>
    );
}

export default StreamInputPanel;