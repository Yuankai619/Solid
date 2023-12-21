import React, { useState } from 'react';
import { Paper, TextField, IconButton, Switch, FormControlLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function StreamInputPanel() {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    document.body.style.background = "#222222";
    const handleToggleChange = (event) => {
        setIsAnonymous(event.target.checked);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    return (
        <Paper style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            transition: 'all 0.3s ease',
            transform: inputFocused ? 'translateTop(-50%)' : 'translateY(0)'
        }}>
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
            <TextField
                multiline
                rows={inputFocused ? 4 : 2}
                placeholder="type...?"
                variant="outlined"
                fullWidth
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={{ margin: '10px 0' }}
                InputProps={{
                    style: {
                        padding: '15px', // 這裡增加padding來調整文字和框的間距
                    },
                    endAdornment: (
                        <IconButton aria-label="send">
                            {isAnonymous ? <VisibilityOffIcon /> : <SendIcon />}
                        </IconButton>
                    ),
                }}
            />
            {/* <IconButton aria-label="send">
                {isAnonymous ? <VisibilityOffIcon /> : <SendIcon />}
            </IconButton> */}
        </Paper>
    );
}

export default StreamInputPanel;