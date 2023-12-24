import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
const JoinedClassCardTheme = createTheme({
  // typography: {
  //     fontFamily: [
  //       'Poppins', // 您選擇的 Google 字體
  //       'sans-serif', // 作為後備的系統字體
  //     ].join(','),
  // },
  components: {
    MuiTypography: {
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


function JoinedClassCard({data}) {
  const [authorName , setAuthorName] = useState('');
  useEffect(() => {
    async function fetchData() {
        await GetUserInfo();
    }
    fetchData();
  }, []); // 確保只在組件掛載時調用一次
  const GetUserInfo = async () => {
    
    try{
      const response = await axios({
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        }, data: JSON.stringify({
          id : data.authorID
        }),
        withCredentials: true,
        url: "http://localhost:4000/course/getOnesInfo"
      });
      setAuthorName(response.data.authorName);
    }catch(err){
      console.log(err);
    }
  };
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={JoinedClassCardTheme}>
      <Box sx={{ minWidth: 275 }} >
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/joinedroom/${data.classID}`}>
        <Card variant="outlined" sx={{ cursor: 'pointer' }} > 
         <React.Fragment>
          <CardContent >
            <Typography variant="h2" sx={{ fontSize: 20, fontWeight: 700 }} color="#000" >
              {data.title}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500, marginTop: '32px' }} color="#999" component="div">
                  owner: {authorName}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 500, }} color="#000" >
              Class ID: {data.classID}
            </Typography>
          </CardContent>
          {/* <CardActions>
      <Button size="small" >Learn More</Button>
    </CardActions> */}
        </React.Fragment>
        </Card>
        </Link>
      </Box>
    </ThemeProvider>
  )
}

export default JoinedClassCard;