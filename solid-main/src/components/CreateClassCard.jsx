import React,{useState,useEffect}from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CreateClassCardTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: [
            'Poppins', 
            'sans-serif', 
          ].join(','),
          // fontWeight: '700',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          paddingBottom: '10px',
          paddingTop: '10px',
          paddingRight: '20px',
          paddingLeft: '10px',
          marginBottom: '23px',
          marginTop: '13px',
          marginRight: '27px',
          marginLeft: '27px',
          borderRadius: '24px',
          backgroundColor: '#EEEEEE',
        },
      },
    },
  },
});

function CreateClassCard(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup'); 
  };
  const [stateColor,setStatecolor]=useState('#000');
  useEffect(() => {
    if (props._state === 'open') {
      setStatecolor('#2D6CB6');
    } else if (props._state === 'close') {
      setStatecolor('#999999');
    }
  }, [props._state]);
  return (
    <ThemeProvider theme={CreateClassCardTheme}>
      <Box sx={{ minWidth: 275 }} >
        <Card variant="outlined" sx={{ cursor: 'pointer' }} > 
         <React.Fragment>
          <CardContent onClick={handleClick}>
            <Typography variant="h2" sx={{ fontSize: 20, fontWeight: 700 }} color="#000" >
              {props._discussionName}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500, marginTop: '32px' }} color={stateColor} component="div">
              state:{props._state}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 500, }} color="#000" >
              Class ID: {props._classId}
            </Typography>
          </CardContent>
          {/* <CardActions>
      <Button size="small" >Learn More</Button>
    </CardActions> */}
        </React.Fragment></Card>
      </Box>
    </ThemeProvider>
  )
}

export default CreateClassCard;