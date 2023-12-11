import React,{useState}from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import CheckboxStatement from "../components/CheckboxStatement";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme,ThemeProvider,createTheme } from '@mui/material/styles';
function LoginPage(){
    document.body.style.background="linear-gradient(-45deg, #141E30, #243B55,#434343)";
    document.body.style.backgroundSize=" 400% 400%";
    document.body.style.animation=" gradient 30s ease infinite";
    document.body.style.height= "100vh";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [realName, setRealName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmpasswordError, setConfirmpasswordError] = useState(false);
    const [realnameError, setRealnameError] = useState(false);
    const [studentIdError, setStudentIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const handleSubmit = async (event) => {
    event.preventDefault();
  
    // 確保密碼和確認密碼相同
    if (String(password) !== String(confirmPassword)) {
      setConfirmpasswordError(true);
      return;
    }else{
      setConfirmpasswordError(false);
    }
  
    // 創建要提交的數據對象
    const userData = {
      username,
      password,
      realName,
      studentId,
      email,
      isTermsAccepted
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
  

    const curtheme = useTheme();
    const isMobile = useMediaQuery(curtheme.breakpoints.down('sm'));
    const isPad = useMediaQuery(curtheme.breakpoints.down('md'));
    const boxGap = "45px";
    const theme = createTheme({
        components: {
          MuiContainer: {
            styleOverrides: {
              root: {
                backgroundColor: '#222222', // 自定義背景顏色
                borderRadius: '24px',      // 自定義邊框圓角
                color: '#EEEEEE',
                opacity: '0.8',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
                // 可以添加更多的自定義樣式
              }
            }
          }
        }
    });
    return(
        <ThemeProvider theme={theme}>
        <Container  maxWidth="sm" sx={{py:"75px", px: isMobile ? "45px":(isPad ? "144px":"360px") } } backgroundColor="#222222" >
          <Box my={boxGap}>
          <h1 className="title">Create account</h1>
          </Box>
          <Box my={boxGap}>
            <InputText 
              id = "username"
              iserror={usernameError} errorText={"error"} isrequired={true} label="username"
              onChange={(e) => setUsername(e.target.value)}
            ></InputText>
          </Box>
          <Box my={boxGap}>
            <InputPassword 
              id = "password"
              iserror={passwordError} errorText={"error"} isrequired={true} label="password"
              onChange={(e) => setPassword(e.target.value)}
            ></InputPassword>
          </Box>
          <Box my={boxGap}>
            <InputPassword 
              id = "confirm password"
              iserror={confirmpasswordError} errorText={"password is different"} isrequired={true} label="confirm password"
              onChange={(e) => {
                setConfirmPassword( e.target.value);
                if (!confirmpasswordError && String(password)===String(confirmPassword)) {
                  setConfirmpasswordError(true); 
                } 
              }}
            ></InputPassword>
          </Box>
          <Box my={boxGap}>
            <InputText 
              id = "real name"
              iserror={realnameError} errorText={"error"} isrequired={true} label="real name"
              onChange={(e) => setRealName(e.target.value)}
              ></InputText>
          </Box>
          <Box my={boxGap}>
            <InputText 
              id ="sutdent ID"
              iserror={studentIdError} errorText={"error"} isrequired={true} label="student ID"
              onChange={(e) => setStudentId(e.target.value)}
            ></InputText>
          </Box>
          <Box my={boxGap}>
            <InputText 
              id = "email"
              iserror={emailError} errorText={"error"} isrequired={false} label="email"
              onChange={(e) => setEmail(e.target.value)}  
            ></InputText>
          </Box>
          <Box my={boxGap}>
            <CheckboxStatement 
              id = "accept Term"
              statement="I accept the terms and privacy policy"
              onChange={(e) => setIsTermsAccepted(e.target.value)}
            ></CheckboxStatement>
          </Box>
          <Box sx={{my:boxGap,px:"40px"}}>
            <SignupButton 
              id = "sing up"
              innertext="SugnUp"
              onClick={handleSubmit}
            ></SignupButton>
          </Box>
      </Container>
      </ThemeProvider>
    );
}

export default LoginPage;