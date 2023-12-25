import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import InputText from '../components/InputText';
import JoinClassDialogTheme from '../themes/JoinClassDialogTheme';
import { useClassDataContext } from '../context/ClassDataContext';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function JoinClassByIdDialog(props) {
    const { handleNewJoinedClass } = useClassDataContext();
    const [inputClassID, setInputClassID] = useState('');
    const [username, setUsername] = useState('');
    const [realName, setRealName] = useState('');
    const [studentID, setStudentId] = useState('');
    const [userID, setUserId] = useState('');
    const [googleId, setgoogleId] = useState('');

    // useEffect(() => {
    //     GetUserInfo();
    // }, []);
    // const GetUserInfo = async () => {
    //     axios({
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         withCredentials: true,
    //         url: `${process.env.REACT_APP_API_URL}/course/getJoinedClass`
    //     })
    //     .then((res) => {
    //         console.log(res.data.username);
    //         setUsername(res.data.username)
    //         setRealName(res.data.realname);
    //         setStudentId(res.data.studentID);
    //         setUserId(res.data._id);
    //         setgoogleId(res.data.googleid);
    //     })
    //     .catch((error) => {

    //     });
    // };
    const handleJoin = () => {
        props.setDialogOpen();
        console.log(inputClassID);
        // let tmp
        axios({
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                classID : inputClassID
            }),
            withCredentials: true,
            url: `http://localhost:4000/course/userAddJoinedClass`
        })
        .then((res) => {
            console.log('fgo',res.data);
            handleNewJoinedClass(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    
    }
    
    return (
        <ThemeProvider theme={JoinClassDialogTheme}>
            <React.Fragment>
                <Dialog open={props.dialogOpen} onClose={props.setDialogOpen} TransitionComponent={Transition}>
                    <DialogTitle>Input Class ID to Join</DialogTitle>
                    <DialogContent>
                        <InputText
                            id={props.id} label={props.label}
                            iserror={props.classIdError} errorText={props.errorText} isrequired={props.isrequired} error={props.iserror}
                            onChange={(e) => { setInputClassID(e.target.value); }} value={inputClassID} 
                        ></InputText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.setDialogOpen} sx={{ color: '#EEEEEE', marginRight: '30px', fontSize: '1rem' }}>Cancel</Button>
                        <Button onClick={handleJoin} sx={{ fontWeight: 'bold', marginRight: '30px', fontSize: '1.2rem' }}>Join</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default JoinClassByIdDialog;