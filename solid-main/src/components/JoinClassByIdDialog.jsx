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
    const handleCloseDialog = () => {
        props._setDialogOpen(false);
    };
    return (
        <ThemeProvider theme={JoinClassDialogTheme}>
            <React.Fragment>
                <Dialog open={props._dialogOpen} onClose={handleCloseDialog} TransitionComponent={Transition}>
                    <DialogTitle>Input Class ID to Join</DialogTitle>
                    <DialogContent>
                        <InputText
                            id={props.id} label={props.label}
                            iserror={props.classIdError} errorText={props.errorText} isrequired={props.isrequired} error={props.iserror}
                            onChange={props.onChange}
                        ></InputText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} sx={{ color: '#EEEEEE', marginRight: '30px', fontSize: '1rem' }}>Cancel</Button>
                        <Button onClick={handleCloseDialog} sx={{ fontWeight: 'bold', marginRight: '30px', fontSize: '1.2rem' }}>Join</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default JoinClassByIdDialog;