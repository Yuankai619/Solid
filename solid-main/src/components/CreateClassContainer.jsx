import React, { useState } from "react";
import Container from '@mui/material/Container';
import CreateClassCard from "./CreateClassCard";
import { useClassDataContext } from '../context/ClassDataContext';
function CreateClassContainer({data,...props}) {
  const { createdClassData } = useClassDataContext();

  return (
    <Container>
      {createdClassData.map((data) => (
        <CreateClassCard
          key={data.id}
          data={data}
        />
      ))}
    </Container>
  );
}

export default CreateClassContainer;