import React,{useState}from "react";
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
function LoginPage(){
    document.body.style.background="linear-gradient(-45deg, #141E30, #243B55,#1B1c1E)";
    document.body.style.backgroundSize=" 400% 400%";
    document.body.style.animation=" gradient 10s ease infinite";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();

      // 创建要提交的数据对象
      const userData = {
        username,
        password,
      };
      alert(JSON.stringify(userData));
      // try {
      //   // 发送 POST 请求到后端登录接口
      //   const response = await fetch('您的后端登录API地址', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(userData),
      //   });

      //   if (response.ok) {
      //     // 请求成功，处理响应数据
      //     const data = await response.json();
      //     console.log("登录成功：", data);
      //     // 这里可以根据需要进行页面跳转或其他操作
      //   } else {
      //     // 请求失败，处理错误
      //     console.error("登录失败：", response.statusText);
      //     // 这里可以设置错误状态以反馈到UI
      //   }
      // } catch (error) {
      //   // 网络错误或其他异常
      //   console.error("网络或其他错误：", error);
      //   // 这里可以设置错误状态以反馈到UI
      // }
    };


    const boxGap = "45px";
    return(  
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
          <Box sx={BoxTextFieldTheme}>
            <InputText 
              id = "username"
              iserror={usernameError} errorText={"error"} isrequired={true} label="username"
              onChange={(e) => setUsername(e.target.value)}
            ></InputText>
          </Box>
          <Box sx={BoxTextFieldTheme}>
            <InputPassword 
              id = "password"
              iserror={passwordError} errorText={"error"} isrequired={true} label="password"
              onChange={(e) => setPassword(e.target.value)}
            ></InputPassword>
          </Box>
          <Box sx={BoxButtonTheme}>
            <LoginButton 
              id = "Login"
              innertext="Login"
              onClick={handleSubmit}
            ></LoginButton>
          </Box>
          <Box  sx={BoxButtonTheme}>
            <SignupButton 
              id = "Singup"
              innertext="Singup"
              onClick={handleSubmit}
            ></SignupButton>
          </Box>
          <Box my={boxGap}>
            <Divider sx={DividerTheme} >Or Login With</Divider>
          </Box>
          <Box sx={BoxButtonTheme} > 
          <GoogleLoginButton 
            id="loginwithgoogle"
            onClick={handleSubmit} 
            innertext="Login with Google"
          />
          </Box>
      </Container>
      </ThemeProvider>
    
    );

}

export default LoginPage;