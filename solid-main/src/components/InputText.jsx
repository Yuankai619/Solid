import React from "react";
import TextField from "@mui/material/TextField";
import TextFieldTheme from "../themes/TextFieldTheme";
import {ThemeProvider}  from '@mui/material/styles';
function InputText(props) {
  return(       
    <ThemeProvider theme={TextFieldTheme}>
        <TextField
            // focused 
            margin="dense"
            id={props.id}
            placeholder={props.placeholder}
            onChange={props.onChange}
            error = {props.iserror ? true : false}
            helperText={props.iserror ? props.errorText : ""}
            fullWidth 
            required = {props.isrequired ? true : false}
            label= {props.label}
            defaultValue={props.defaultValue}
            value={props.value}
            />
    </ThemeProvider>
  );
}

export default InputText;