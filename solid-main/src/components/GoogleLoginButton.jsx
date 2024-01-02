import React from "react";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { ThemeProvider }  from '@mui/material/styles';
import GoogleLoginButtonTheme from "../themes/GoogleLoginButtonTheme";
function GoogleLoginButton(props){
    return(
        <ThemeProvider theme={GoogleLoginButtonTheme}>
        <Button 
            variant="outlined" startIcon={<GoogleIcon />} size="large"  fullWidth id={props.id} onClick={props.onClick}>
            {props.innertext}
        </Button>
        </ThemeProvider>
    );
}

export default GoogleLoginButton;