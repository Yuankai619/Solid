import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Slide } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import JoinClassDialogTheme from '../themes/JoinClassDialogTheme';
import { useClassDataContext } from '../context/ClassDataContext';
import InputText from '../components/InputText';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function JoinClassByIdDialog(props) {
    const { handleNewJoinedClass, checkJoinedClassIDExist } = useClassDataContext();
    const [inputClassID, setInputClassID] = useState('');
    const [classIdError, setClassIdError] = useState(false);

    useEffect(() => {
        if (inputClassID) {
            setClassIdError(false);
        }
    }, [inputClassID]);
    const [errorText, setErrorText] = useState('');
    const handleJoin = async() => {
        if(!inputClassID ) {
            setErrorText("ClassID can't be empty");
            setClassIdError(true);
            return;
        }
        else if (checkJoinedClassIDExist(inputClassID)) {            
            setErrorText("You have already joined this class");
            setClassIdError(true);
            return;
        }
        
        
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/course/userAddJoinedClass`,
                JSON.stringify({ classID: inputClassID }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if(response.data === "ClassID not found") {
                setErrorText("ClassID not found");
                setClassIdError(true);
                return;
            }
            // console.log('Joined class:', response.data);
            handleNewJoinedClass(response.data);
        } catch (error) {
            console.error("Error in handleJoin:", error);
        }
        props.setDialogOpen();
    }

    
    return (
        <ThemeProvider theme={JoinClassDialogTheme}>
                <Dialog open={props.dialogOpen} onClose={props.setDialogOpen} TransitionComponent={Transition} >
                    <DialogTitle>Input Class ID to Join</DialogTitle>
                    <DialogContent>
                        <InputText
                            id={props.id} label={props.label}
                            iserror={classIdError} errorText={errorText} isrequired={true} 
                            onChange={(e) => { setInputClassID(e.target.value); }} value={inputClassID} 
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