import React,{useState}from "react";
import Container from '@mui/material/Container';
import JoinedClassCard from './JoinedClassCard';

function JoinedClassCardContainer(){
  //getuserid
  
  return(
    <Container>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>
        <JoinedClassCard></JoinedClassCard>

    </Container>
  );
}

export default JoinedClassCardContainer;