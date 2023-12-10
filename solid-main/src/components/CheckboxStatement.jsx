import React from "react";
import CheckboxTheme from '../themes/CheckboxTheme';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {ThemeProvider}  from '@mui/material/styles';
function CheckboxStatement(props) {
  return(       
    <ThemeProvider theme={CheckboxTheme}>
        <FormGroup>
            <FormControlLabel control={<Checkbox />}   label={props.statement} id={props.id} onChange={props.onChange}/>
        </FormGroup>
    </ThemeProvider>
  );
}

export default CheckboxStatement;