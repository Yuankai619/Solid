import React,{useState}from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import LoginButton from "../components/LoginButton";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme,ThemeProvider,createTheme } from '@mui/material/styles';
import DividerTheme from "../themes/DividerTheme";
import GoogleLoginButton from "../components/GoogleLoginButton";
// deerufin
import axios from 'axios';
// deerufin

function LoginPage(){
    document.body.style.background="linear-gradient(-45deg, #141E30, #243B55,#1B1c1E)";
    document.body.style.backgroundSize=" 400% 400%";
    document.body.style.animation=" gradient 10s ease infinite";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    //deerufin  
    const [data, setData] = useState(null);
    const handleSubmit = async (event) => {
<<<<<<< Updated upstream
    event.preventDefault();
  

    // 創建要提交的數據對象
    const userData = {
      username,
      password,
    };
    console.log(userData);
    // try {
    //   const response = await fetch('您的後端API地址', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    //   });
  
    //   if (response.ok) {
    //     // 處理響應
    //     console.log("Registration successful");
    //   } else {
    //     console.error("Registration failed");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };
  
=======
      axios({
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          username: username,
          password: password
        }),
        withCredentials: true,
        url: "http://localhost:4000/login"
      })
      .then((res) => console.log(res));
    } 
    const showUser =  ()=>{
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/user",
      }).then((res) => setData(res.data));
    }
    //deerufin

    // const handleSubmit = async (event) => {
    //   event.preventDefault();

    //   // 创建要提交的数据对象
    //   const userData = {
    //     username,
    //     password,
    //   };
    //   alert(JSON.stringify(userData));
    //   // try {
    //   //   // 发送 POST 请求到后端登录接口
    //   //   const response = await fetch('您的后端登录API地址', {
    //   //     method: 'POST',
    //   //     headers: {
    //   //       'Content-Type': 'application/json',
    //   //     },
    //   //     body: JSON.stringify(userData),
    //   //   });

    //   //   if (response.ok) {
    //   //     // 请求成功，处理响应数据
    //   //     const data = await response.json();
    //   //     console.log("登录成功：", data);
    //   //     // 这里可以根据需要进行页面跳转或其他操作
    //   //   } else {
    //   //     // 请求失败，处理错误
    //   //     console.error("登录失败：", response.statusText);
    //   //     // 这里可以设置错误状态以反馈到UI
    //   //   }
    //   // } catch (error) {
    //   //   // 网络错误或其他异常
    //   //   console.error("网络或其他错误：", error);
    //   //   // 这里可以设置错误状态以反馈到UI
    //   // }
    // };
>>>>>>> Stashed changes

  const ContainerTheme = createTheme({
      components: {
        MuiContainer: {
          defaultProps: {
            [`@media (max-width:600px)`]: { // 對應 sm 斷點
              // width:"100px",
              // maxHeight:"sx",
                // sx:{{ maxWidth: '1280px' }},
                // padding: '45px', // 在小屏幕上的內邊距
              },
              // [`@media (max-width:900px)`]: { // 對應 md 斷點
              //   maxWidth:"sm",
              //   // padding: '144px', // 在中等屏幕上的內邊距
              // },
              [`@media (min-width:900px)`]: { // 對應 md 斷點
                maxWidth:"sm",
                // padding: '360px', // 在中等屏幕上的內邊距
              },
          // 设置默认的最大宽度
          maxWidth: 'sm', // 例如: 'xs', 'sm', 'md', 'lg', 'xl'
        },
          styleOverrides: {
            root: {
              [`@media (max-width:600px)`]: { // 對應 sm 斷點
                // marginLeft: '46px',
                // marginRight: '46px',
                // sx:{{ maxWidth: '1280px' }},
                // padding: '45px', // 在小屏幕上的內邊距
              },
              // [`@media (max-width:900px)`]: { // 對應 md 斷點
              //   maxWidth:"sm",
              //   // padding: '144px', // 在中等屏幕上的內邊距
              // },
              [`@media (min-width:900px)`]: { // 對應 md 斷點
                // maxWidth:"sm",
                // padding: '360px', // 在中等屏幕上的內邊距
              },
              backgroundColor: '#222222', // 自定義背景顏色
              borderRadius: '24px',      // 自定義邊框圓角
              color: '#EEEEEE',

              paddingTop: '5px',
              paddingBottom: '30px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 1)', 
              width:"300px",
              // [`@media (max-width:600px)`]: { // 對應 sm 斷點
              //   maxWidth:"sm",
              //   // padding: '45px', // 在小屏幕上的內邊距
              // },
              // [`@media (max-width:900px)`]: { // 對應 md 斷點
              //   maxWidth:"sm",
              //   // padding: '144px', // 在中等屏幕上的內邊距
              // },
              // [`@media (min-width:90px)`]: { // 對應 md 斷點
              //   maxWidth:"sm",
              //   // padding: '360px', // 在中等屏幕上的內邊距
              // }
              // marginTop 
              // 可以添加更多的自定義樣式
            }
          },
        },

      }
  });
  const boxGap = "45px";
  const btnPading = '90px';
  const BoxTheme={
    my:boxGap,
    // px:btnPading,
    // px:btnPading,
    // px:"80px",
    [`@media (max-width:600px)`]: { // 對應 sm 斷點
      btnPading:"30px",
      // px:"12px",
      // padding: '45px', // 在小屏幕上的內邊距
    },
    // [`@media (max-width:900px)`]: { // 對應 md 斷點
    //   maxWidth:"sm",
    //   // padding: '144px', // 在中等屏幕上的內邊距
    // },
    [`@media (min-width:601px)`]: { // 對應 md 斷點
      btnPading:"100px",
      // px:"80px",
      // padding: '360px', // 在中等屏幕上的內邊距
    },
  }

    return(
      
        <ThemeProvider theme={ContainerTheme}>
        <Box my={boxGap}>
          <h1 className="login-title">Solid</h1>
        </Box>
        <Container >
          <Box my={0}>
          <h2 className="login-panel-title">Login</h2>
          </Box>
          <Box my={0}>
          <p className="login-panel-subtitle">Please log in to access your account.</p>
          </Box>
          <Box sx={BoxTheme}>
            <InputText 
              id = "username"
              iserror={usernameError} errorText={"error"} isrequired={true} label="username"
              onChange={(e) => setUsername(e.target.value)}
            ></InputText>
          </Box>
          <Box sx={BoxTheme}>
            <InputPassword 
              id = "password"
              iserror={passwordError} errorText={"error"} isrequired={true} label="password"
              onChange={(e) => setPassword(e.target.value)}
            ></InputPassword>
          </Box>
          <Box sx={{BoxTheme,px:btnPading}}>
            <LoginButton 
              id = "Login"
              innertext="Login"
              onClick={handleSubmit}
            ></LoginButton>
          </Box>
          <Box sx={BoxTheme}>
            <SignupButton 
              id = "Singup"
              innertext="Singup"
              onClick={handleSubmit}
            ></SignupButton>
          </Box>
          <Box my={boxGap}>
          {/* <ThemeProvider theme={DividerTheme}> */}
            <Divider sx={DividerTheme}>Or Login With</Divider>
          {/* </ThemeProvider> */}
          </Box>
          <Box sx={BoxTheme} > 
          <GoogleLoginButton 
            id="loginwithgoogle"
            onClick={() => alert("Hello")} 
            innertext="Log in with Google"
          />
          </Box>
          <div>
            <Box sx={BoxButtonTheme} > 
            <SignupButton 
              id="test"
              onClick={showUser} 
              innertext="test"
            />
            </Box>
            { data ?  <h1>hi {data.username}</h1> : null }  
          </div>
      </Container>
      </ThemeProvider>
    
    );

}

export default LoginPage;