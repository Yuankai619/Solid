import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardHeader } from "@mui/material";
import CreateClassCardTheme from '../themes/CreateClassCardTheme';
// { discussionName, classID, state }
function CreateClassCard({data, onUpdate, onDelete}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
  };

  const [stateColor, setStatecolor] = useState('#000');
  useEffect(() => {
    data.state === 'open' ? setStatecolor('#2D6CB6') : setStatecolor('#999999');
  }, [data.state]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeState = (event) => {
    event.stopPropagation();
    data.state === 'open' ? onUpdate({ state: 'close' }) : onUpdate({ state: 'open' });
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete();
  };
  return (
    <ThemeProvider theme={CreateClassCardTheme}>
      <Box sx={{ minWidth: 275 }} >
        <Card variant="outlined" sx={{ cursor: 'pointer' }} > 
          <CardHeader
            action={
              <IconButton
                aria-label="class setting menu"
                onClick={handleClickMenu}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={data.discussionName}
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
            <MenuItem onClick={handleChangeState}>Start</MenuItem>
            <MenuItem onClick={handleDelete} sx={{color:"#CC0000"}}>Delete</MenuItem>
          </Menu>
          <React.Fragment>
            <CardContent >
              <Typography sx={{ fontSize: 15, fontWeight: 600, marginTop: '12px' }} color={stateColor} component="div">
                state: {data.state}
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 600, }} color="#000" >
                Class ID: {data.classID}
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default CreateClassCard;