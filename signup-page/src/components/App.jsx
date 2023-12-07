import React from "react";
import TextField from "@mui/material/TextField";
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const TextFieldtheme = createTheme({
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
  
function App() {

    return (
        <div>
        <Container maxWidth="sm">
            <Box my={2}>
            <h1 className="title">Create account</h1>
            </Box>
            <Box my={2}>
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
            </Box>
            <Box my={2}>
            <ThemeProvider theme={TextFieldtheme}>
                <TextField
                    // focused 
                    fullWidth 
                    required
                    id="outlined-required"
                    label="password"
                    type="password"
                    defaultValue=""
                    // className="input-field"
                    // color="#warning"
                    />
            </ThemeProvider>
            </Box>
            <Box my={2}>
            <ThemeProvider theme={TextFieldtheme}>
                <TextField
                    // focused 
                    required
                    fullWidth 
                    id="outlined-required"
                    label="confirm password"
                    type="password"
                    defaultValue=""
                    // className="input-field"
                    // color="#warning"
                    />
            </ThemeProvider>
            </Box>
            <Box my={2}>
            <ThemeProvider theme={TextFieldtheme}>
                <TextField
                    // focused 
                    required
                    fullWidth 
                    id="outlined-required"
                    label="real name"
                    defaultValue=""
                    // className="input-field"
                    // color="#warning"
                    />
            </ThemeProvider>
            </Box>
            <Box my={2}>
            <ThemeProvider theme={TextFieldtheme}>
                <TextField
                    // focused 
                    required
                    fullWidth 
                    id="outlined-required"
                    label="student ID"
                    defaultValue=""
                    // className="input-field"
                    // color="#warning"
                    />
            </ThemeProvider>
            </Box>
            <Box my={2}>
            <ThemeProvider theme={TextFieldtheme}>
                <TextField
                    // focused 
                    required
                    fullWidth 
                    id="outlined-required"
                    label="email"
                    defaultValue=""
                    // className="input-field"
                    // color="#warning"
                    />
            </ThemeProvider>
            </Box >
        </Container>
        </div>
    );
}

export default App;


