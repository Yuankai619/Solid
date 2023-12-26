import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CardHeader } from "@mui/material";
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
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'black', // 菜单背景色
          color: 'white',           // 菜单文字颜色
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#000',  // IconButton颜色
          '&:hover': {
            backgroundColor: 'lightblue', // 鼠标悬停时的背景色
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        default: { variant: 'h2' },
        title: {
          fontSize: '20px',
          fontWeight: '700',
          color: '#000',

        },
        root: {
          marginBottom: '0px',
          paddingBottom: '0px',
          paddingRight: '0px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: '520',
          color: '#EEEEEE',
        },
      },
    },
  },
});


function JoinedClassCard({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setAllowNavigate(false); // 打开 Menu 时禁止跳转F
  };
  const handleChangeState = (event) => {
    event.stopPropagation();
    setMenuState(menuState == 'true' ? 'false' : 'true');
    // handleChangeCreatedClassState(data.id, menuState == 'true' ? 'false' : 'true');
  };
  const [menuState, setMenuState] = useState(data.state);
  const handleDelete = (event) => {
    event.stopPropagation();
    console.log(data.id)
    handleClose();
    // handleDeleteCreatedClass(data.id);
  };
  const [allowNavigate, setAllowNavigate] = useState(true);
  const handleClose = () => {
    setAnchorEl(null);
    setAllowNavigate(true);
  };
  const [authorName, setAuthorName] = useState('');
  useEffect(() => {
    async function fetchData() {
      await GetUserInfo();
    }
    fetchData();
  }, []); // 確保只在組件掛載時調用一次
  const GetUserInfo = async () => {

    try {
      const response = await axios({
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        }, data: JSON.stringify({
          id: data.authorID
        }),
        withCredentials: true,
        url: `${process.env.REACT_APP_API_URL}/course/getOnesInfo`
      });
      setAuthorName(response.data.authorName);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={JoinedClassCardTheme}>
      <Box sx={{ minWidth: 275 }} >

        <Card variant="outlined" sx={{ cursor: 'pointer' }} >
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/joinedroom/${data.classID}`}>
            <CardHeader
              // action={
              //   <IconButton
              //     aria-label="class setting menu"
              //     onClick={handleClickMenu}
              //   >
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={data.title}
            />
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#222222',
                  color: 'white',
                },
              }}
            >

              <MenuItem onClick={undefined} sx={{ color: "#CC0000" }}>Delete</MenuItem>
            </Menu>
            <CardContent >
              {/* <Typography variant="h2" sx={{ fontSize: 20, fontWeight: 700 }} color="#000" >
              {data.title}
            </Typography> */}

              <Typography sx={{ fontSize: 15, fontWeight: 600, marginTop: '12px' }} color="#999" component="div">
                owner: {authorName}
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 600, }} color="#000" >
                Class ID: {data.classID}
              </Typography>
            </CardContent>


          </Link>

        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default JoinedClassCard;