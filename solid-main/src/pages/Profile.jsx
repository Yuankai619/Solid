import React, { useState, useEffect } from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import CheckboxStatement from "../components/CheckboxStatement";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoginChecker from '../checker/LoginChecker';
import axios from 'axios';
import { getImageListItemBarUtilityClass } from "@mui/material";


function ProfilepPage() {    
    const [imgUrl, setImgUrl] = useState('');
    const [username, setUsername] = useState('');
    const [realName, setRealName] = useState('');
    const [studentID, setStudentId] = useState('');
    //const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            const loginStatus = await LoginChecker();
            setIsLoggedIn(loginStatus);
        };
        GetUserInfo();
        document.body.style.background = "#222222";
        document.body.style.overflow = '';
        return () => {
            document.body.style.background = "";
            document.body.style.overflow = '';
        };
    }, []);
    
    //console.log("turn");\
  
    const GetUserInfo = async () => {
        axios({
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },  
          withCredentials: true,
          url: "http://localhost:4000/api/getUserInfo"
        })  
        .then((res) =>{

            console.log(res.data.username)
            // console.log 是正確的
            setImgUrl(res.data.thumbnail);
            setUsername(res.data.username)
            setRealName(res.data.realname);
            setStudentId(res.data.studentID);
          
        })
        .catch((error) => {
            
        });
    };
 
    
    
   
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

    const handleConfirm = async (event) => {
        event.preventDefault();

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
          url: "http://localhost:4000/api/updateinfo"
        })  
        .then((res) =>{
            console.log('ss');
            navigate('/home');
          
        })
        .catch((error) => {
           console.error(error);
        });
      };
    

    const [selectedImage, setSelectedImage] = useState(null);
    const [studentIdError, setStudentIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImgUrl(URL.createObjectURL(event.target.files[0]));
        }
    };
    const navigate = useNavigate();

    const curtheme = useTheme();
    const isMobile = useMediaQuery(curtheme.breakpoints.down('sm'));
    const isPad = useMediaQuery(curtheme.breakpoints.down('md'));
    const boxGap = "45px";
    return (
        <Box backgroundColor="#222222" height={"100%"}>
            <Container maxWidth="sm" sx={{ py: "55px", px: isMobile ? "45px" : (isPad ? "144px" : "360px") }}>
                <Box my={boxGap}>
                    <h1 className="signup-panel-title" sx={{}}>Profile</h1>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                    <Avatar
                        src={imgUrl}
                        sx={{ width: 120, height: 120, marginBottom:'20px'}}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera style={{color:"#EEEEEE"}}/>
                        </IconButton>
                    </label>
                </Box>
                <Box my={boxGap}>
                    <InputText
                        id="username"
                        value={username}
                        iserror={usernameError} errorText={"error"} isrequired={true} label="username"
                        onChange={(e) => setUsername(e.target.value)}
                    ></InputText>
                </Box>
                <Box my={boxGap}>
                    <InputText
                        id="real name"
                        value={realName}
                        iserror={realnameError} errorText={"error"} isrequired={true} label="real name"
                        onChange={(e) => setRealName(e.target.value)}
                    ></InputText>
                </Box>
                <Box my={boxGap}>
                    <InputText
                        id="sutdent ID"
                        value={studentID}
                        iserror={studentIdError} errorText={"error"} isrequired={true} label="student ID"
                        onChange={(e) => setStudentId(e.target.value)}
                    ></InputText>
                </Box>

                {/* <Box my={boxGap}>
                    <CheckboxStatement
                        id="accept Term"
                        statement="I accept the terms and privacy policy"
                        onChange={(e) => setIsTermsAccepted(e.target.value)}
                    ></CheckboxStatement>
                </Box> */}
                <Box sx={{ my: "60px", px: "40px" }}>
                    <SignupButton
                        id="confirm info"
                        innertext="Confirm"
                        onClick={handleConfirm}
                    ></SignupButton>
                </Box>
            </Container>
        </Box>
    );
}

export default ProfilepPage;


