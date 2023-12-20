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
import axios from 'axios';


function UpdateGoogleUserInfo() {
  const navigate = useNavigate();
  let isLogin = false, isCompleteCreate = false;
  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.background = "#222222";
    const fetchUserData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:4000/profile/',
          withCredentials: true
        });
        // console.log(response.data);
        // console.log(response.data.loginState);
        console.log(response.data.completeCreateState);
        console.log(isLogin,isCompleteCreate);
        
        if (response.data.loginState == "LoginFailed") {  
          navigate('/login');
        }
        if (response.data.completeCreateState == 'FinishCompleteCreate') { 
          console.log('navigate to home');
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    return () => {
      document.body.style.background = "";
    };
  }, []);
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [studentID, setStudentId] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [realnameError, setRealnameError] = useState(false);
  const [studentIDError, setStudentIDError] = useState(false);
  const [isTermsAcceptedError, setIsTermsAcceptedError] = useState(false);

  
  const handleConfirm = async (event) => {
    event.preventDefault();
    const userdata = { 
      username: username, 
      realname: realName, 
      studentID: studentID,
      isTermsAccepted: isTermsAccepted
    };
    userdata.JSON.stringify(userdata);
    axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },  
      data: userdata,
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
              iserror={studentIDError} errorText={"error"} isrequired={true} label="student ID"
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
              onClick={handleConfirm}
            ></SignupButton>
          </Box>
      </Container>
    </Box>
  );
}

export default UpdateGoogleUserInfo;