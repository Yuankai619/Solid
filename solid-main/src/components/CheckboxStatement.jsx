import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import CheckboxTheme from '../themes/CheckboxTheme';

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