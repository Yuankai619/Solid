import React from "react";
import WhiteButtonTheme from "../themes/WhiteButtonTheme";
import Button from '@mui/material/Button';
import {ThemeProvider}  from '@mui/material/styles';
function SignupButton(props) {
  return(       
    <ThemeProvider theme={WhiteButtonTheme}>
        <Button size="large" variant="text" fullWidth id={props.id} onClick={props.onClick}>{props.innertext}</Button>
    </ThemeProvider>
  );
}

export default SignupButton;