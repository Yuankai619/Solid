import React from "react";
import ButtonTheme from "../themes/ButtonTheme";
import Button from '@mui/material/Button';
import {ThemeProvider}  from '@mui/material/styles';
function SignupButton(props) {
  return(       
    <ThemeProvider theme={ButtonTheme}>
        <Button variant="text" fullWidth >{props.innertext}</Button>
    </ThemeProvider>
  );
}

export default SignupButton;