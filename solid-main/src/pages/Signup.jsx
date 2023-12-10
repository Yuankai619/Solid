import React from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import CheckboxStatement from "../components/CheckboxStatement";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
function SignupPage() {
  const curtheme = useTheme();
  const isMobile = useMediaQuery(curtheme.breakpoints.down('sm'));
  const isPad = useMediaQuery(curtheme.breakpoints.down('md'));
  const boxGap = "45px";
  return (
      <Container maxWidth="sm" sx={{py:"75px", px: isMobile ? "45px":(isPad ? "144px":"360px") }}>
          <Box my={boxGap}>
          <h1 className="title">Create account</h1>
          </Box>
          <Box my={boxGap}>
            <InputText iserror={false} errorText={"error"} isrequired={true} label="username"></InputText>
          </Box>
          <Box my={boxGap}>
            <InputPassword iserror={false} errorText={"error"} isrequired={true} label="password"></InputPassword>
          </Box>
          <Box my={boxGap}>
            <InputPassword iserror={false} errorText={"error"} isrequired={true} label="confirm password"></InputPassword>
          </Box>
          <Box my={boxGap}>
            <InputText iserror={false} errorText={"error"} isrequired={true} label="real name"></InputText>
          </Box>
          <Box my={boxGap}>
            <InputText iserror={false} errorText={"error"} isrequired={true} label="student ID"></InputText>
          </Box>
          <Box my={boxGap}>
            <InputText iserror={false} errorText={"error"} isrequired={false} label="email"></InputText>
          </Box>
          <Box my={boxGap}>
            <CheckboxStatement statement="I accept the terms and privacy policy"></CheckboxStatement>
          </Box>
          <Box sx={{my:boxGap,px:"40px"}}>
            <SignupButton innertext="SugnUp"></SignupButton>
          </Box>
      </Container>
  );
}

export default SignupPage;


