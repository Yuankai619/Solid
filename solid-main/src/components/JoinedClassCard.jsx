import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Card, CardActions, CardContent, Button, IconButton, Typography,
  Menu, MenuItem, CardHeader
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ThemeProvider } from '@mui/material/styles';
import { useClassDataContext } from '../context/ClassDataContext';
import JoinedClassCardTheme from "../themes/JoinedClassCardTheme";

function JoinedClassCard({ data }) {
  const { handleDeleteJoinedClass } = useClassDataContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setAllowNavigate(false); 
  };

  const handleDelete = (event) => {
    event.stopPropagation();    
    handleClose();
    handleDeleteJoinedClass(data.id);
  };
  const [allowNavigate, setAllowNavigate] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const handleClose = () => {
    setAnchorEl(null);
    setAllowNavigate(true);
  };
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

  return (
    <ThemeProvider theme={JoinedClassCardTheme}>
      <Box sx={{ minWidth: 275 }} >
        <Card variant="outlined" sx={{ cursor: 'pointer' }} >
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/joinedroom/${data.classID}`} onClick={(e) => {
            if (!allowNavigate) {
              e.preventDefault(); 
            }}}>
            <CardHeader
              action={
                <IconButton
                  aria-label="class setting menu"
                  onClick={handleClickMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={data.title}
            />
            <Menu
              id="long-menu"
              open={open}
              anchorEl={anchorEl}
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

              <MenuItem onClick={handleDelete} sx={{ color: "#CC0000" }}>Delete</MenuItem>
            </Menu>
            <CardContent >
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