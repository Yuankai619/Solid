import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

import InputText from './InputText';
import JoinClassDialogTheme from '../themes/JoinClassDialogTheme';
import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import PrebuildDialogTheme from '../themes/PrebuildDialogTheme';
import axios from 'axios';
import { useClassDataContext } from '../context/ClassDataContext';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PrebuildDialog(props) {
    const { handleNewCreatedClass } = useClassDataContext();

    const [username, setUsername] = useState('');
    const [realName, setRealName] = useState('');
    const [studentID, setStudentId] = useState('');
    const [userID, setUserId] = useState('');
    const [googleId,setgoogleId] = useState('');

    useEffect(() => {
        GetUserInfo();
    }, []);

    const GetUserInfo = async () => {
        axios({
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },  
          withCredentials: true,
          url: "http://localhost:4000/api/getUserInfo"
        })  
        .then((res) =>{
            console.log(res.data.username);
            setUsername(res.data.username)
            setRealName(res.data.realname);
            setStudentId(res.data.studentID);
            setUserId(res.data._id);
            setgoogleId(res.data.googleid);
        })
        .catch((error) => {
            
        });
    };

    const handleCreate = () => {
        props.setDialogOpen();
        axios({
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },  
            data: JSON.stringify({
              userID : userID,
              description: description,
              roomTitle : roomTitle,
              state : state.gilad,
              username : username,
              googleid : googleId
            }),
            withCredentials: true,
            url: "http://localhost:4000/course/create"
          })  
          .then((res) =>{
            // console.log(res.data);
            handleNewCreatedClass(res.data);

          })
          .catch((error) => {
            console.error(error);
          });
    }


    //switch setting
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
    //switch setting
    
    const [roomTitle, setRoomTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(true);
    const [inputFocused, setInputFocused] = useState(false);
    const handleInputFocus = () => {
        setInputFocused(true);
    };
    console.log("debug");

    const handleInputBlur = () => {
        setInputFocused(false);
    };    
    return (
        <ThemeProvider theme={PrebuildDialogTheme}> 
            <React.Fragment>
                <Dialog open={props.dialogOpen} onClose={props.setDialogOpen} TransitionComponent={Transition}>
                    <DialogTitle>Prebuild  Discussion</DialogTitle>
                    <DialogContent>
                        <Box sx={{marginTop:'10px'}}>
                            <Typography sx={{ color: '#EEEEEE', marginButtom: '20px' }}>
                            {"Room Title:"}
                        </Typography>
                        <InputText
                            id={"room title"} 
                            placeholder="your title ?"
                            iserror={false} errorText={"error title name"} isrequired={true} 
                            onChange={(e) => setRoomTitle(e.target.value)} 
                        ></InputText>
                        </Box>
                        <Box sx={{ margin: '20px 0px 20px' }}>
                            <Typography sx={{ color: '#EEEEEE', marginButtom: '20px' }}>
                                {"Description:"}
                            </Typography>
                            <TextField      
                                multiline
                                rows={inputFocused ? 4 : 2}
                                placeholder="your description ?"
                                variant="outlined"
                                fullWidth
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                style={{ margin: '10px 0', borderColor:'#EEEEEE' }}
                                InputProps={{
                                    style: {
                                        color:'#EEEEEE',
                                        padding: '15px', // 這裡增加padding來調整文字和框的間距
                                    },
                                }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Box>
                        <FormControlLabel
                            sx={{color:'#EEEEEE'}}
                            control={
                                <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                            }
                            label="Set to open"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.setDialogOpen} sx={{ color: '#EEEEEE', marginRight: '30px', fontSize: '1rem' }}>Cancel</Button>
                        <Button onClick={handleCreate} sx={{ fontWeight: 'bold', marginRight: '30px', fontSize: '1.2rem' }}>Create</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default PrebuildDialog;

