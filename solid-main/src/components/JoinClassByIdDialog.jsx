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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function JoinClassByIdDialog(props) {
    return (
        <ThemeProvider theme={JoinClassDialogTheme}>
            <React.Fragment>
                <Dialog open={props.dialogOpen} onClose={props.setDialogOpen} TransitionComponent={Transition}>
                    <DialogTitle>Input Class ID to Join</DialogTitle>
                    <DialogContent>
                        <InputText
                            id={props.id} label={props.label}
                            iserror={props.classIdError} errorText={props.errorText} isrequired={props.isrequired} error={props.iserror}
                            onChange={props.onChange}
                        ></InputText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.setDialogOpen} sx={{ color: '#EEEEEE', marginRight: '30px', fontSize: '1rem' }}>Cancel</Button>
                        <Button onClick={props.setDialogOpen} sx={{ fontWeight: 'bold', marginRight: '30px', fontSize: '1.2rem' }}>Join</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default JoinClassByIdDialog;