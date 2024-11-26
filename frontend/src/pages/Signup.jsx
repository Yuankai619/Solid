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
import axios from 'axios';


function SignupPage() {
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
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (String(password) !== String(confirmPassword)) {
      setConfirmpasswordError(true);
      return;
    } else {
      setConfirmpasswordError(false);
    }
    axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        username: username,
        password: password,
        realname: realName,
        studentID: studentId,
        email: email
      }),
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}/auth/register`
    })
      .then((res) => {
        console.log('res data = ', res.data)

        navigate('/home');

      });
  };

  //UI setting
  const curtheme = useTheme();
  const isMobile = useMediaQuery(curtheme.breakpoints.down('sm'));
  const isPad = useMediaQuery(curtheme.breakpoints.down('md'));
  const boxGap = "45px";
  return (
    <Box backgroundColor="#222222" height={"100%"}>
      <Container maxWidth="sm" sx={{ py: "75px", px: isMobile ? "45px" : (isPad ? "144px" : "360px") }}>
        <Box my={boxGap}>
          <h1 className="signup-panel-title">Create account</h1>
        </Box>
        <Box my={boxGap}>
          <InputText
            id="username"
            iserror={usernameError} errorText={"error"} isrequired={true} label="username"
            onChange={(e) => setUsername(e.target.value)}
          ></InputText>
        </Box>
        <Box my={boxGap}>
          <InputPassword
            id="password"
            iserror={passwordError} errorText={"error"} isrequired={true} label="password"
            onChange={(e) => setPassword(e.target.value)}
          ></InputPassword>
        </Box>
        <Box my={boxGap}>
          <InputPassword
            id="confirm password"
            iserror={confirmpasswordError} errorText={"password is different"} isrequired={true} label="confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (!confirmpasswordError && String(password) === String(confirmPassword)) {
                setConfirmpasswordError(true);
              }
            }}
          ></InputPassword>
        </Box>
        <Box my={boxGap}>
          <InputText
            id="real name"
            iserror={realnameError} errorText={"error"} isrequired={true} label="real name"
            onChange={(e) => setRealName(e.target.value)}
          ></InputText>
        </Box>
        <Box my={boxGap}>
          <InputText
            id="sutdent ID"
            iserror={studentIdError} errorText={"error"} isrequired={true} label="student ID"
            onChange={(e) => setStudentId(e.target.value)}
          ></InputText>
        </Box>
        <Box my={boxGap}>
          <InputText
            id="email"
            iserror={emailError} errorText={"error"} isrequired={false} label="email"
            onChange={(e) => setEmail(e.target.value)}
          ></InputText>
        </Box>
        <Box my={boxGap}>
          <CheckboxStatement
            id="accept Term"
            statement="I accept the terms and privacy policy"
            onChange={(e) => setIsTermsAccepted(e.target.value)}
          ></CheckboxStatement>
        </Box>
        <Box sx={{ my: boxGap, px: "40px" }}>
          <SignupButton
            id="sing up"
            innertext="SignUp"
            onClick={handleSubmit}
          ></SignupButton>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;


