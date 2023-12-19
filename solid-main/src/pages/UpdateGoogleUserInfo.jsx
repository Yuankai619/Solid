import React,{useState,useEffect}from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import CheckboxStatement from "../components/CheckboxStatement";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme} from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
// deerufin
import axios from 'axios';
// deerufin


function UpdateGoogleUserInfo() {
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const [isCompleteCreate, setisCompleteCreate] = useState(false);
  useEffect(() => {
    document.body.style.overflow = '';
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/home/auth-success'); // 假设这是您的 API 端点
        console.log("test:::::",response.data);
        if(response.data == "not_login"){  // 未登入 
          setisLogin(false);
        }else{
          setisLogin(true);
        }
        if(response.data == 'not_complete_create'){ // 已登入
          setisCompleteCreate(false);
        }else if(response.data == 'complete_create'){
          setisCompleteCreate(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setisLogin(false);
        setisCompleteCreate(false);
      }
    };
    fetchUserData();
    return () => {
      // document.body.style.overflow = '';
    };
  }, []);
  useEffect(() => {
    if(!isLogin){
      console.log('navigate to profile');
      navigate('/login');
      return;
    }else if(isCompleteCreate){
      navigate('/home');
    }
  },[isLogin,isCompleteCreate]);
   console.log("turn");
   
  // axios({
  //   method: "GET",
  //   withCredentials: true,
  //   url: "http://localhost:4000/profile/me"
  // })
  // .then((res) =>{
  //   //console.log('res data = ',res.data)
    
  // });
  useEffect(() => {
    document.body.style.background = "#222222";
    return () => {
      document.body.style.background = "";
    };
  }, []);
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
    //console.log(`haha`)
    // 確保密碼和確認密碼相同
    if (String(password) !== String(confirmPassword)) {
      setConfirmpasswordError(true);
      return;
    }else{
      setConfirmpasswordError(false);
    }
    axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        username: username,
        realname: realName,
        studentID: studentId
      }),
      withCredentials: true,
      url: "http://localhost:4000/profile/me"
    })
    .then((res) =>{
      console.log(' what ');
        navigate('/home');
    })
    .catch((err)=>{
      console.log(' post ');
      console.log(err);
    });
  };
  

  const curtheme = useTheme();
  const isMobile = useMediaQuery(curtheme.breakpoints.down('sm'));
  const isPad = useMediaQuery(curtheme.breakpoints.down('md'));
  const boxGap = "45px";
  return (
    <Box backgroundColor="#222222" height={"100%"}>
      <Container  maxWidth="sm" sx={{py:"75px", px: isMobile ? "45px":(isPad ? "144px":"360px") } }>
          <Box my={boxGap}>
          <h1 className="signup-panel-title">Setting information</h1>
          </Box>
          <Box my={boxGap}>
            <InputText 
              id = "username"
              iserror={usernameError} errorText={"error"} isrequired={true} label="username"
              onChange={(e) => setUsername(e.target.value)}
            ></InputText>
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
            <CheckboxStatement 
              id = "accept Term"
              statement="I accept the terms and privacy policy"
              onChange={(e) => setIsTermsAccepted(e.target.value)}
            ></CheckboxStatement>
          </Box>
          <Box sx={{my:boxGap,px:"40px"}}>
            <SignupButton 
              id = "confirm info"
              innertext="Confirm"
              onClick={handleSubmit}
            ></SignupButton>
          </Box>
      </Container>
    </Box>
  );
}

export default UpdateGoogleUserInfo;