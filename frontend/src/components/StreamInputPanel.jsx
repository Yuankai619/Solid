import { useEffect, useState } from 'react';
import { Paper, TextField, IconButton, Switch, FormControlLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import io from 'socket.io-client'
import { useUserInfo } from '../context/UserInfoContext';
import { useRoomData } from '../context/RoomDataContext';


// let socket = io.connect(`${import.meta.env.REACT_APP_API_URL}`)

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

function StreamInputPanel({ handleSendMessage }) {
    const { userInfo } = useUserInfo();
    const [content, setContent] = useState('');
    const { sendMessageMutation, isSendMessageSuccess } = useRoomData();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [sendIconColor, setSendIconColor] = useState('#EEEEEE');
    const userId = userInfo?._id;
    // useEffect(() => {
    //     socket.emit('join_room', classID);
    //     socket.on('refresh', (data) => {
    //         // console.log(data);
    //     })
    // }, [socket])

    const handleSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        //content cnanot be empty
        if (!content.trim().length) {
            return;
        }
        const payload = {
            userId,
            content,
            isAnonymous,
        };
        setContent('');
        await sendMessageMutation(payload);
        // try {

        // } catch (error) {
        //     console.error('Error sending message:', error);
        // }
    };
    // useEffect(() => {
    //     handleSendMessage(isSendMessageSuccess);
    // }, [isSendMessageSuccess, handleSendMessage])


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
                    fullWidth
                    variant="outlined"
                    placeholder="type here"
                    value={content}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    rows={inputFocused ? 4 : 2}
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
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            // e.preventDefault(); // Prevents the default action of the enter key
                            if (content.trim().length) { // 只有當content不只是空白或換行時
                                handleSubmit(e); // 觸發提交函數
                            }
                        }
                    }}
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
                    <IconButton aria-label="send" onClick={handleSubmit} disabled={!content.trim().length > 0}>
                        <SendIcon sx={{ color: sendIconColor }} />
                    </IconButton>
                </div>
            </Paper>
        </ThemeProvider>
    );
}

export default StreamInputPanel;