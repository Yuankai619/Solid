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
import { Link } from 'react-router-dom';
import { useClassDataContext } from '../context/ClassDataContext'; 

function CreateClassCard({data}) {
  const { handleChangeCreatedClassState, handleDeleteCreatedClass } = useClassDataContext();
  const navigate = useNavigate();

  const [stateColor, setStatecolor] = useState('#000');
  const [menuState, setMenuState] = useState(data.state);
  useEffect(() => {
    data.state == 'true' ? setStatecolor('#2D6CB6') : setStatecolor('#999999');
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
    setMenuState(menuState == 'true' ? 'false' : 'true');
    handleChangeCreatedClassState(data.id, menuState == 'true'? 'false' : 'true');
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    console.log(data.id)
    handleDeleteCreatedClass(data.id);    
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
            <MenuItem onClick={handleChangeState}>{menuState == 'true' ? "Close" : "Open"}</MenuItem>
            <MenuItem onClick={handleDelete} sx={{color:"#CC0000"}}>Delete</MenuItem>
          </Menu>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} key={data.id} to={`/room/${data.classID}`}> 
          <React.Fragment>
            <CardContent >
                <Typography sx={{ fontSize: 15, fontWeight: 600, marginTop: '12px' }} color={menuState == 'true' ? '#2D6CB6' : '#999999'} component="div">
                  state: {menuState == 'true' ? 'open' : 'close'}
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 600, }} color="#000" >
                Class ID: {data.classID}
              </Typography>
            </CardContent>
          </React.Fragment>
          </Link>
        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default CreateClassCard;