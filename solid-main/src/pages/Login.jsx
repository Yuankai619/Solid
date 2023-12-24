import React, { useState, useEffect } from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import LoginButton from "../components/LoginButton";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import LoginContainerTheme from "../themes/LoginPanelTheme";
import { ThemeProvider } from '@mui/material/styles';
import DividerTheme from "../themes/DividerTheme";
import BoxButtonTheme from "../themes/BoxButtonTheme";
import BoxTextFieldTheme from "../themes/BoxTextFieldTheme";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
// deerufin
import axios from 'axios';
// deerufin

function LoginPage() {
  useEffect(() => {
    document.body.style.background = "linear-gradient(-45deg, #32854b, #243B55,#a4c44d)";
    document.body.style.backgroundSize = "400% 400%";
    document.body.style.animation = "gradient 10s ease infinite";
    console.log('load login page');
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.animation = '';
    };
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //deerufin  
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const handleSignup = () => {
    document.body.style.backgroundColor = "#222222";
    navigate('/signup');
  }
  const handleSubmit = () => {
    axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        username: username,
        password: password,
      }),
      withCredentials: true,
      url: "http://localhost:4000/auth/login"
    })
      .then((res) => {
        console.log('res data = ', res.data)
        if (res.data === 'username_not_exist' || res.data === 'password_not_match') {
          //alert('The username does not exist.');
          alert('Invalid username or password.');
        } else if (res.data === 'successfully_authenticated') {
          alert('Successfully logged in.')
          navigate('/home');
        }
      });

  }//handlesubmit
  const googleSubmit = () => {
    window.location.href = 'http://localhost:4000/auth/google'


  }

  //deerufin


  const boxGap = "45px";
  return (
    <ThemeProvider theme={LoginContainerTheme}>
      <Box my={boxGap}>
        <h1 className="login-title">Solid</h1>
      </Box>
      <Container >
        <Box my={0}>
          <h2 className="login-panel-title">Login</h2>
        </Box>
        <Box my={0}>
          <p className="login-panel-subtitle">Please login to access your account.</p>
        </Box>
        {/* <Box sx={BoxTextFieldTheme}>
          <InputText
            id="username"
            iserror={usernameError} errorText={"error"} isrequired={true} label="username"
            onChange={(e) => setUsername(e.target.value)}
          ></InputText>
        </Box>
        <Box sx={BoxTextFieldTheme}>
          <InputPassword
            id="password"
            iserror={passwordError} errorText={"error"} isrequired={true} label="password"
            onChange={(e) => setPassword(e.target.value)}
          ></InputPassword>
        </Box>
        <Box sx={BoxButtonTheme}>
          <LoginButton
            id="Login"
            innertext="Login"
            onClick={handleSubmit}
          ></LoginButton>
        </Box>
        <Box sx={BoxButtonTheme}>
          <SignupButton
            id="Singup"
            innertext="Singup"
            onClick={handleSignup}
          ></SignupButton>
        </Box>
        <Box my={boxGap}>
          <Divider sx={DividerTheme} >Or Login With</Divider>
        </Box> */}
        <Box sx={BoxButtonTheme} >
          <GoogleLoginButton
            id="loginwithgoogle"
            onClick={googleSubmit}

            innertext="Login with Google"
          />
        </Box>

      </Container>
    </ThemeProvider>

  );

}

export default LoginPage;