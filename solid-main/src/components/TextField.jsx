import React from "react";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider ,useTheme } from '@mui/material/styles';
const TextFieldtheme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', // 您選擇的 Google 字體
        'sans-serif', // 作為後備的系統字體
      ].join(','),
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            input: {
              color: '#EEEEEE', // 文字顏色
            },
            '& label.Mui-focused': {
              color: '#EEEEEE', // 聚焦時的 label 顏色
            },
            '& label': {    
              color: '#999999', // 預設的 label 顏色
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#999999', // 框線顏色
              },
              '&:hover fieldset': {
                borderColor: '#EEEEEE', // 滑   鼠懸停時的框線顏色
              },
              '&.Mui-focused fieldset': {
                borderColor: '#EEEEEE', // 聚焦時的框線顏色
              },
            },
          },
        },
      },
    },
  });
  
function TextField(props) {
  return(       
    <ThemeProvider theme={TextFieldtheme}>
        <TextField
            // focused 
            fullWidth 
            required
            id="outlined-required"
            label="username"
            defaultValue=""
            // className="input-field"
            // color="#warning"
            />
    </ThemeProvider>
  );
}

export default TextField;