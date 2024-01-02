import React from "react";
import TextField from "@mui/material/TextField";
import TextFieldTheme from "../themes/TextFieldTheme";
import {ThemeProvider}  from '@mui/material/styles';
function InputText(props) {
  return(       
    <ThemeProvider theme={TextFieldTheme}>
        <TextField
            // focused 
            fullWidth 
            margin="dense"
            id={props.id}
            value={props.value}
            label= {props.label}
            onChange={props.onChange}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            error = {props.iserror ? true : false}
            required = {props.isrequired ? true : false}
            helperText={props.iserror ? props.errorText : ""}
            />
    </ThemeProvider>
  );
}

export default InputText;