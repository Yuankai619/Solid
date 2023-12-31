import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import TextFieldTheme from "../themes/TextFieldTheme";


function InputPassword(props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return(       
        <ThemeProvider theme={TextFieldTheme}>
            <TextField
                id={props.id}
                fullWidth 
                onChange={props.onChange}
                required={props.isrequired}
                error = {props.iserror ? true : false}
                helperText={props.iserror ? props.errorText : ""}
                label={props.label}
                type={showPassword ? 'text' : 'password'}
                defaultValue=""
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{ color: '#EEEEEE' }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </ThemeProvider>
    );
}

export default InputPassword;