import React, { useState } from 'react';
import { Paper, TextField, IconButton, Switch, FormControlLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function StreamInputPanel() {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [sendIconColor, setSendIconColor] = useState('#EEEEEE');
    // document.body.style.background = "#222222";
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
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={{ 
                        margin: '10px 0' ,
                        // paddingRight: 20
                    //     position: 'fixed',
                    // paddingButtom:"50px",
                    //     bottom: 50,
                    //     left: 0,
                        // padding: '20px 0px 20px 20px',
                    //     right: 0,
                    //     // transition: 'all 0.3s ease',
                    //     // transform: inputFocused ? 'translateTop(-50%)' : 'translateY(0)'
                    }}
                    InputProps={{
                        style: {
                            padding: '15px', // 這裡增加padding來調整文字和框的間距
                            color: '#EEEEEE',
                        },
                    }}
                /> 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between',padding:"0px 6px 0px 20px" }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAnonymous}
                                onChange={handleToggleChange}
                                name="anonymous"
                            />
                        }
                        label="Anonymous"
                        // style={{ marginRight: 'auto' }} // 保持 Switch 在左
                    // sx={{zIndex: 1000}}
                    />
                    <IconButton aria-label="send">
                        <SendIcon sx={{ color: sendIconColor }} />
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