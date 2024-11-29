import Container from '@mui/material/Container';
import JoinedClassCard from './JoinedClassCard';
import Proptype from 'prop-types';
function JoinedClassCardContainer({ conversations }) {
  return (
    <Container sx={{ overflow: "auto", height: "92dvh" }}>
      {conversations.map((data, index) => (
        <JoinedClassCard
          key={index}
          data={data}
        />
      ))}
    </Container>
  );
}
JoinedClassCardContainer.propTypes = {
  conversations: Proptype.array.isRequired,
};
export default JoinedClassCardContainer;