import React, { useState } from "react";
import Container from '@mui/material/Container';
import JoinedClassCard from './JoinedClassCard';
import { useClassDataContext } from '../context/ClassDataContext';
function JoinedClassCardContainer({ conversations }) {
  return (
    <Container sx={{ overflow: "auto", height: "92dvh", backgroundColor: "red" }}>
      {conversations.map((data, index) => (
        <JoinedClassCard
          key={index}
          data={data}
        />
      ))}
    </Container>
  );
}

export default JoinedClassCardContainer;