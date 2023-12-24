import React,{useState}from "react";
import Container from '@mui/material/Container';
import JoinedClassCard from './JoinedClassCard';
import { useClassDataContext } from '../context/ClassDataContext';
function JoinedClassCardContainer(){
  const { joinedCLassData } = useClassDataContext();
  
  return(
    <Container>
      {joinedCLassData.map((data,index) => (
        <JoinedClassCard
          key={index}
          data={data}
        />
      ))}
    </Container>
  );
}

export default JoinedClassCardContainer;