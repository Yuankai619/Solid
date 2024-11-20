import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardHeader
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  ThemeProvider } from '@mui/material/styles';
import CreateClassCardTheme from '../themes/CreateClassCardTheme';
import { useClassDataContext } from '../context/ClassDataContext';


function CreateClassCard({ data }) {
  const { handleChangeCreatedClassState, handleDeleteCreatedClass } = useClassDataContext();
  const [menuState, setMenuState] = useState(data.state.toString());
  const [allowNavigate, setAllowNavigate] = useState(true); // 控制在 Menu 打開時是否允許跳轉
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setAllowNavigate(false); // 打开 Menu 时禁止跳转F
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAllowNavigate(true);
  };
  
  const handleChangeState = (event) => {
    event.stopPropagation();
    handleChangeCreatedClassState(data.id, menuState == 'true' ? 'false' : 'true');
    setMenuState(menuState == 'true' ? 'false' : 'true');
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    // console.log(data.id)
    handleClose();
    handleDeleteCreatedClass(data.id);
  };
  return (
    <ThemeProvider theme={CreateClassCardTheme}>
      <Box sx={{ minWidth: 275 }} >
        <Card variant="outlined" sx={{ cursor: 'pointer' }} >
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/room/${data.classID}`} onClick={(e) => {
            if (!allowNavigate) {
              e.preventDefault(); // 如果不允许跳转，则阻止 Link 的默认行为
            }
          }}>
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
              <MenuItem onClick={handleDelete} sx={{ color: "#CC0000" }}>Delete</MenuItem>
            </Menu>
            <React.Fragment>

              <CardContent onClick={(e) => { if (!allowNavigate) e.stopPropagation(); }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600, marginTop: '12px' }} color={menuState == 'true'? '#2D6CB6' : '#999999'} component="div">
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