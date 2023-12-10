import React from "react";
import TextField from "@mui/material/TextField";
import TextFieldTheme from "../themes/TextFieldTheme";
import {ThemeProvider}  from '@mui/material/styles';
function InputText(props) {
  return(       
    <ThemeProvider theme={TextFieldTheme}>
        <TextField
            // focused 
            error = {props.iserror ? true : false}
            helperText={props.iserror ? props.errorText : ""}
            fullWidth 
            required = {props.isrequired ? true : false}
            id="outlined-required"
            label= {props.label}
            defaultValue=""
            />
    </ThemeProvider>
  );
}

export default InputText;