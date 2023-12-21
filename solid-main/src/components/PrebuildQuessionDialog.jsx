import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

import InputText from '../components/InputText';
import JoinClassDialogTheme from '../themes/JoinClassDialogTheme';
import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PrebuildQuessionDialog(props) {
    const handleCloseDialog = () => {
        props._setDialogOpen(false);
    };
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
    return (
        <ThemeProvider theme={JoinClassDialogTheme}> 
            <React.Fragment>
                <Dialog open={props._dialogOpen} onClose={handleCloseDialog} TransitionComponent={Transition}>
                    <DialogTitle>Prebuild Quession</DialogTitle>
                    <DialogContent>
                        <Box>
                        <Typography sx={{ color: '#EEEEEE' }}>
                            {"Room Title:"}
                        </Typography>
                        <InputText
                            id={props.id} label={"room title"}
                            iserror={props.classIdError} errorText={props.errorText} isrequired={props.isrequired} error={props.iserror}
                            onChange={props.onChange}
                        ></InputText>
                        </Box>
                        {/* <Box> */}
                            <Typography sx={{ color: '#EEEEEE' }}F>
                                {"Description:"}
                            </Typography>
                            <InputText
                                multiline
                                id={props.id} label={"description"}
                                iserror={props.classIdError} errorText={props.errorText} isrequired={props.isrequired} error={props.iserror}
                                onChange={props.onChange}
                            ></InputText>
                        {/* </Box> */}
                        <FormControlLabel
                            sx={{color:'#EEEEEE'}}
                            control={
                                <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                            }
                            label="Set to open"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} sx={{ color: '#EEEEEE', marginRight: '30px', fontSize: '1rem' }}>Cancel</Button>
                        <Button onClick={handleCloseDialog} sx={{ fontWeight: 'bold', marginRight: '30px', fontSize: '1.2rem' }}>Create</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default PrebuildQuessionDialog;

// const data = {
//     id: 1,//backend給
//     title: "Card1",//user給
//     infoData: {
//         "classID": "001",//backend給
//         "state": "close",//user給
//         "ownerID": "1234556",//backend給
//         "creat date": "2021/10/10",//
//         "description": "this is a description"//user給
//     }
// };