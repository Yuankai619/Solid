import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Card, Fab,CardContent, TextField, Button, Drawer, List, ListItem, ListItemIcon, Checkbox, ListItemText, makeStyles } from '@material-ui/core';
import ArrowBackIcon  from '@mui/icons-material/ArrowBackIos';
import InfoIcon  from '@mui/icons-material/Info';
import SendIcon  from '@mui/icons-material/Send';
import AnonymousIcon from '@mui/icons-material/SearchOff';; // This should be an icon representing anonymity

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    messageContainer: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        height: 'calc(100vh - 56px)', // Adjust for app bar and input area
        overflowY: 'auto',
    },
    messageCard: {
        margin: theme.spacing(2),
    },
    inputArea: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing(2),
        background: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    input: {
        width: '100%',
    },
    fab: {
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        zIndex: 1,
    },
}));

function MessagePage() {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, inputValue]);
            setInputValue('');
        }
    };

    return (
        <>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" color="inherit">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">Discussion Name</Typography>
                    <IconButton edge="end" color="inherit">
                        <InfoIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div className={classes.messageContainer}>
                {messages.map((message, index) => (
                    <Card key={index} className={classes.messageCard}>
                        <CardContent>{message}</CardContent>
                    </Card>
                ))}
            </div>

            <div className={classes.inputArea}>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    placeholder="Type a message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    multiline
                    rows={inputValue ? 4 : 1}
                />
                <Fab color="primary" className={classes.fab} onClick={handleSend}>
                    <SendIcon />
                </Fab>
            </div>
        </>
    );
}

export default MessagePage;