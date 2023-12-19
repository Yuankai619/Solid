import React,{useState}from "react";
import Container from '@mui/material/Container';
import CreateClassCard from "./CreateClassCard";

function CreateClassContainer(){
  //getuserid
  
  return(
    <Container>
        <CreateClassCard _discussionName={"Card1"} _classId={'000000'} _state={"open"}></CreateClassCard>
        <CreateClassCard></CreateClassCard>
        <CreateClassCard></CreateClassCard>
        <CreateClassCard></CreateClassCard>
        <CreateClassCard></CreateClassCard>
        <CreateClassCard></CreateClassCard>
        <CreateClassCard></CreateClassCard>
        <CreateClassCard></CreateClassCard>
        <CreateClassCard></CreateClassCard>

    </Container>
  );
}

export default CreateClassContainer;