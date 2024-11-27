import { useState, useEffect } from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import CheckboxStatement from "../components/CheckboxStatement";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Register } from "../api/auth/Register";
import { useUserInfo } from "../context/UserInfoContext";

function SignupPage() {
  const [userName, setUserName] = useState('');
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

  useEffect(() => {
    document.body.style.background = "#222222";
    return () => {
      document.body.style.background = "";
    };
  }, []);
  const { googleId, token, gmail, avatarUrl } = useAuth();
  const { refetchUserInfo } = useUserInfo();
  const { mutate: signupMutation } = useMutation({
    mutationFn: async (payload) => {
      try {
        const res = await Register(payload, token);
        return res;
      } catch (error) {
        alert("Signup error");
        console.error('Signup error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      refetchUserInfo();
      console.log('Signup success');
      navigate("/home");
    },

  });
  const handleSubmit = () => {
    if (userName === '' || userName.length > 10) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }
    if (realName === '' || realName.length > 10) {
      setRealnameError(true);
      return;
    } else {
      setRealnameError(false);
    }
    if (studentId.length > 10) {
      setStudentIdError(true);
      return;
    } else {
      setStudentIdError(false);
    }

    const payload = {
      userName: userName,
      realName: realName,
      email: gmail,
      studentId: studentId,
      // password: password,
      avatarUrl: avatarUrl,
      googleId: googleId,
    };

    signupMutation(payload);
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
            id="userName"
            iserror={usernameError} errorText={"error"} isrequired={true} label="userName"
            onChange={(e) => setUserName(e.target.value)}
          ></InputText>
        </Box>
        {/* <Box my={boxGap}>
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
        </Box> */}
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
            iserror={studentIdError} errorText={"error"} isrequired={false} label="student ID"
            onChange={(e) => setStudentId(e.target.value)}
          ></InputText>
        </Box>
        {/* <Box my={boxGap}>
          <InputText
            id="email"
            iserror={emailError} errorText={"error"} isrequired={false} label="email"
            onChange={(e) => setEmail(e.target.value)}
          ></InputText>
        </Box> */}
        {/* <Box my={boxGap}>
          <CheckboxStatement
            id="accept Term"
            statement="I accept the terms and privacy policy"
            onChange={(e) => setIsTermsAccepted(e.target.value)}
          ></CheckboxStatement>
        </Box> */}
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
