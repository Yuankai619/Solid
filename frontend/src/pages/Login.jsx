import React, { useState, useEffect } from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import LoginButton from "../components/LoginButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import LoginContainerTheme from "../themes/LoginPanelTheme";
import { ThemeProvider } from "@mui/material/styles";
import DividerTheme from "../themes/DividerTheme";
import BoxButtonTheme from "../themes/BoxButtonTheme";
import BoxTextFieldTheme from "../themes/BoxTextFieldTheme";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";
function LoginPage() {
    const { loginWithGoogle, currentUser, isLoading } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && currentUser) {
            navigate("/home");
        }
    }, [currentUser, isLoading, navigate]);

    if (isLoading) {
        return <div>loading....</div>;
    }
    // useEffect(() => {
    //     // document.body.style.background = "linear-gradient(-45deg, #000000,#A13E97, #632A7E)";
    //     // document.body.style.backgroundSize = "1000% 1000%";
    //     // document.body.style.animation = "gradient 10s ease infinite";

    //     document.body.style.overflow = "auto";
    //     // document.body.style.overflow = 'hidden';
    //     return () => {
    //         document.body.style.overflow = "";
    //         // document.body.style.backgroundSize = '';
    //         // document.body.style.animation = '';
    //     };
    // // }, []);
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [usernameError, setUsernameError] = useState(false);
    // const [passwordError, setPasswordError] = useState(false);

    // const [data, setData] = useState(null);

    // const handleSignup = () => {
    //     document.body.style.backgroundColor = "#222222";
    //     navigate("/signup");
    // };
    // const handleSubmit = () => {
    //   axios({
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     data: JSON.stringify({
    //       username: username,
    //       password: password,
    //     }),
    //     withCredentials: true,
    //     url: `${process.env.REACT_APP_API_URL}/auth/login`
    //   })
    //     .then((res) => {
    //       console.log('res data = ', res.data)
    //       if (res.data === 'username_not_exist' || res.data === 'password_not_match') {
    //         //alert('The username does not exist.');
    //         alert('Invalid username or password.');
    //       } else if (res.data === 'successfully_authenticated') {
    //         alert('Successfully logged in.')
    //         navigate('/home');
    //       }
    //     });

    // }
    const handleSubmit = async () => {
        if (!currentUser) {
            await loginWithGoogle();
        }
    };

    const boxGap = "45px";

    return (
        <ThemeProvider theme={LoginContainerTheme}>
            <AnimatedBackground />
            <Box py={"5dvh"}>
                <h1 className="login-title">HandsUp Free</h1>
            </Box>
            <Container>
                <Box my={"40px"}>
                    <h2 className="login-panel-title">Login</h2>
                </Box>
                <Box my={0}>
                    <p className="login-panel-subtitle">
                        Please login to access your account.
                    </p>
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
                <Box sx={BoxButtonTheme}>
                    <GoogleLoginButton
                        id="loginwithgoogle"
                        onClick={handleSubmit}
                        innertext="Login with Google"
                    />
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                // alignItems="center"
                >
                    <Link
                        href="https://docs.google.com/presentation/d/e/2PACX-1vRXgz1DscDJOS8eBcKqrvovk-OpGnak85o9xU8weQQVB4bW983VNFTw51hNT5chvdvUVMxRmaBJb9fB/pub?start=false&loop=false&delayms=3000"
                        target="_blank"
                        style={{
                            color: "#EEEEEE",
                            textDecorationColor: "#EEEEEE",
                            fontFamily: "Poppins",
                        }}
                    >
                        About Solid
                    </Link>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage;
