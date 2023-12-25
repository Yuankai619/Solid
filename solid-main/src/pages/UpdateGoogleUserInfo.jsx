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
          url: `${process.env.REACT_APP_API_URL}/auth/auth-state`,
          withCredentials: true
        });
        if (response.data.loginState == "LoginFailed") {  
          navigate('/login');
        }
        if (response.data.completeCreateState == 'FinishCompleteCreate') { 
          //console.log('navigate to home');
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

  function checkNameLength(name) {
      if (name.length >= 1 && name.length <= 15) {
          return true;
      } else {
          return false;
      }
  }

  const handleConfirm =  (event) => {
    event.preventDefault();
    //console.log(isTermsAccepted);
    if(!checkNameLength(username)){
      alert('請確認您的username長度在 1 到 15 個字之間')
      return;
    }
    if(!checkNameLength(realName)){
      alert('請確認您的realName長度在 1 到 15 個字之間')
      return;
    }
    if(!checkNameLength(studentID)){
      alert('請確認您的studentID在 1 到 15 個字之間')
      return;
    }
    if(!isTermsAccepted){
        alert('請確認您已詳閱隱私政策')
        return;
    }
    axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },  
      data: JSON.stringify({
        username : username, 
        realname : realName, 
        studentID : studentID
      }),
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}/api/updateinfo`
    })  
    .then((res) =>{
        navigate('/home');
    })
    .catch((error) => {
       console.error(error);
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
              onChange={()=>setIsTermsAccepted(!isTermsAccepted)}
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