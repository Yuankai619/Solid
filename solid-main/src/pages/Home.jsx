import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DialpadIcon from '@mui/icons-material/Dialpad';
import HomePageDrawer from '../components/HomePageDrawer';
import HomeSwipeablePanel from '../components/HomeSwipeablePanel';
import HomeSpeedDial from '../components/HomeSpeedDial';
import JoinClassByIdDialog from '../components/JoinClassByIdDialog';
import HomeAppBar from '../components/HomeAppBar';
import { Navigate } from 'react-router';
import axios from 'axios';

function Home() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/home/check"
    })
    .then((res) =>{
      if(res.data === 'login'){
        
      }else{
        Navigate('/home');
      }
      //console.log('res data = ',res.data)  
    });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const [classIdError, classIdErrorError] = useState(false);
  const [inputClassId, setinputClassId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const actions = [
    [{ icon: <DialpadIcon sx={{color:'#EEEEEE'}}/>, name: 'Action 1 for Tab 0' }],
    // 第二个标签页的 SpeedDial 操作
    [{ icon: <DialpadIcon />, name: 'Action 1 for Tab 1' }, { icon: <DialpadIcon />, name: 'Action 2 for Tab 1' }],
  ];
  const theme = useTheme();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
      <Box sx={{ backgroundColor: '#444' }}>
        <HomePageDrawer
          _drawerOpen={drawerOpen} _toggleDrawer={toggleDrawer}
        />
        <HomeSwipeablePanel
          _value={value} _handleChangeIndex={handleChangeIndex} _theme={theme}
        />
        <HomeSpeedDial
          _actions={actions} _dialogOpen={dialogOpen} _setDialogOpen={setDialogOpen} _tabIndex={value}
        />
        <JoinClassByIdDialog
          id={inputClassId} label={"class ID"} errorText={"class id is invalid"} iserror={classIdError}
          _dialogOpen={dialogOpen} _setDialogOpen={setDialogOpen} isrequired={false}
          onChange={(e) => setinputClassId(e.target.value)}
        />
        <HomeAppBar _value={value} _setValue={setValue} _toggleDrawer={toggleDrawer }/>
      </Box>
  );
}
export default Home;