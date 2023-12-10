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
              // borderRadius: 8,
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
      MuiCheckbox:{
        styleOverrides:{
          root:{
            color: '#999999',
            '&$checked': {
              color: '#EEEEEE',  // 選中時的框線顏色
            },
          }
        }
      },
      MuiFormGroup:{
        styleOverrides:{
          root: {
            '& .MuiFormControlLabel-label': {
              color: '#EEEEEE', // 文字顏色
            }
          },
        }
      },

      MuiButton:{
        styleOverrides:{
          root: {
            borderRadius: 6,
            backgroundColor: '#EEEEEE', // 背景顏色
            color: '#2D6CB6', // 文字顏色
            '&:hover': {
              backgroundColor: '#EEEEEE',
              color: '#2D6CB6',
            },
          },
        }
      },
    },
  });
  
function App() {
  const curtheme = useTheme();
  const isMobile = useMediaQuery(curtheme.breakpoints.down('sm'));
  const isPad = useMediaQuery(curtheme.breakpoints.down('md'));
  const boxGap = "45px";
  return (
      <div>
      <ThemeProvider theme={TextFieldtheme}>
      <Container maxWidth="sm" sx={{py:"75px", px: isMobile ? "45px":(isPad ? "144px":"360px") }}>
          <Box my={boxGap}>
          <h1 className="title">Create account</h1>
          </Box>
          <Box my={boxGap}>
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
          <Box my={boxGap}>
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
          <Box my={boxGap}>
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
          <Box my={boxGap}>
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
          <Box my={boxGap}>
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
          <Box my={boxGap}>
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
          <Box my={boxGap}>
            <ThemeProvider theme={TextFieldtheme}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />}   label="I accept the terms and privacy policy" />
            </FormGroup>
            </ThemeProvider>
          </Box>
          <Box sx={{my:boxGap,px:"40px"}}>
            <ThemeProvider theme={TextFieldtheme}>
            <Button variant="text" fullWidth  >SignUp</Button>
            </ThemeProvider>
          </Box>
      </Container>
      </ThemeProvider>
      </div>
  );
}

export default App;