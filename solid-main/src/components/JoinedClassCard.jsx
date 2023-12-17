import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const JoinedClassCardTheme = createTheme({
  // typography: {
  //     fontFamily: [
  //       'Poppins', // 您選擇的 Google 字體
  //       'sans-serif', // 作為後備的系統字體
  //     ].join(','),
  // },
  components: {
    MuiTypography:{
      styleOverrides: {
        root: {
          fontFamily: [
            'Poppins', // 您選擇的 Google 字體
            'sans-serif', // 作為後備的系統字體
          ].join(','),
          // fontWeight: '700',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          paddingBottom: '13px', 
          paddingTop: '13px',
          paddingRight: '27px',
          paddingLeft: '27px',
          marginBottom: '23px', 
          marginTop: '23px',
          marginRight: '27px',
          marginLeft: '27px',
          borderRadius: '24px', 
          backgroundColor: '#EEEEEE', 
        },
      },
    },
  },
});

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h2" sx={{ fontSize: 20, fontWeight: 700}} color="#000" >
        Discussion Name
      </Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 500}} color="#999"  component="div">
        owner: somebody
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 500}} color="#000" >
        Date: ...
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" >Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <ThemeProvider theme={JoinedClassCardTheme}>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
    </ThemeProvider>
  );
}
