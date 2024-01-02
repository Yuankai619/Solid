import React, { useState } from "react";
import Container from '@mui/material/Container';
import CreateClassCard from "./CreateClassCard";
import { useClassDataContext } from '../context/ClassDataContext';
function CreateClassContainer() {
  const { createdClassData } = useClassDataContext();

  return (
    <Container >
      {createdClassData.map((data,index) => (
        <CreateClassCard
          key={index}
          data={data}
        />
      ))}
    </Container>
  );
}

export default CreateClassContainer;