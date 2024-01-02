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

function CreateClassCard({ data }) {
  const { handleChangeCreatedClassState, handleDeleteCreatedClass } = useClassDataContext();
  const navigate = useNavigate();

  const [stateColor, setStatecolor] = useState('#000');
  const [menuState, setMenuState] = useState(data.state.toString());
  const [allowNavigate, setAllowNavigate] = useState(true); // 新增状态来控制是否允许跳转
  console.log("data.state: ",data.state);
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
    // setTimeout(function () {
      // 在這裡寫入您希望在等待後執行的程式碼
      // console.log('0.1 秒已過');
    // }, 300);
    setMenuState(menuState == 'true' ? 'false' : 'true');
    
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    console.log(data.id)
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
                  onClick={
                    handleClickMenu
                    }
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