import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Slide } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import JoinClassDialogTheme from '../themes/JoinClassDialogTheme';
import { useConversationContext } from '../context/ConversationContext';
import { useUserInfo } from "../context/UserInfoContext";
import InputText from '../components/InputText';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function JoinClassByIdDialog(props) {
    const { handleJoinConversation } = useConversationContext();
    const { userInfo } = useUserInfo();
    const [conversationId, setConversationId] = useState('');
    const [classIdError, setClassIdError] = useState(false);
    const userId = userInfo?._id;
    useEffect(() => {
        if (conversationId) {
            setClassIdError(false);
        }
    }, [conversationId]);
    const [errorText, setErrorText] = useState('');
    const handleJoin = async (e) => {
        if (!conversationId) {
            setErrorText("ClassID can't be empty");
            setClassIdError(true);
            return;
        }
        props.setDialogOpen();
        try {
            await handleJoinConversation(conversationId);
        } catch (error) {
            setErrorText(error.response.data.message);
            setClassIdError(true);
        }
    }


    return (
        <ThemeProvider theme={JoinClassDialogTheme}>
            <Dialog open={props.dialogOpen} onClose={props.setDialogOpen} TransitionComponent={Transition} >
                <DialogTitle>Input Class ID to Join</DialogTitle>
                <DialogContent>
                    <InputText
                        id={props.id} label={props.label}
                        iserror={classIdError} errorText={errorText} isrequired={true}
                        onChange={(e) => { setConversationId(e.target.value); }} value={conversationId}
                    ></InputText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.setDialogOpen} sx={{ color: '#EEEEEE', marginRight: '30px', fontSize: '1rem' }}>Cancel</Button>
                    <Button onClick={handleJoin} sx={{ fontWeight: 'bold', marginRight: '30px', fontSize: '1.2rem' }}>Join</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
export default JoinClassByIdDialog;