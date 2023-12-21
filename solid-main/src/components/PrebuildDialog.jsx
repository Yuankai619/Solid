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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PrebuildDialog(props) {

    


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

    const handlecreate = () => {
        props.setDialogOpen();
        alert(roomTitle + " " + description + " " + state.gilad)
    }
    return (
        <ThemeProvider theme={PrebuildDialogTheme}> 
            <React.Fragment>
                <Dialog open={props.dialogOpen} onClose={props.setDialogOpen} TransitionComponent={Transition}>
                    <DialogTitle>Prebuild Quession</DialogTitle>
                    <DialogContent>
                        <Box sx={{marginTop:'20px'}}>
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
                        <Button onClick={handlecreate} sx={{ fontWeight: 'bold', marginRight: '30px', fontSize: '1.2rem' }}>Create</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default PrebuildDialog;

