import Container from '@mui/material/Container';
import CreateClassCard from "./CreateClassCard";
import Proptype from 'prop-types';

function CreateClassContainer({ conversations }) {
  return (
    <Container sx={{ overflow: "auto", height: "92dvh" }}>
      {conversations.map((data, index) => (
        <CreateClassCard
          key={index}
          data={data}
        />
      ))}
    </Container>
  );
}
CreateClassContainer.propTypes = {
  conversations: Proptype.array.isRequired,
};
export default CreateClassContainer;