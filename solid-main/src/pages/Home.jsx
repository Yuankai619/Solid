import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import DialpadIcon from '@mui/icons-material/Dialpad';
import HomePageDrawer from '../components/HomePageDrawer';
import HomeSwipeablePanel from '../components/HomeSwipeablePanel';
import HomeSpeedDial from '../components/HomeSpeedDial';
import JoinClassByIdDialog from '../components/JoinClassByIdDialog';
import HomeAppBar from '../components/HomeAppBar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PrebuildDialog from '../components/PrebuildDialog';
import LoginChecker from '../checker/LoginChecker';
import { ClassDataProvider } from '../context/ClassDataContext';
import { useClassDataContext } from '../context/ClassDataContext';

function Home() {
  // window.location.reload();
  // window.location.assign('/home');//刷新當前頁
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginCheckComplete, setIsLoginCheckComplete] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const result = await LoginChecker();
      setIsLoggedIn(result.isLoggedIn);
      setIsLoginCheckComplete(true);
      if (result.redirectTo) {
        navigate(result.redirectTo);
      }
    };
    document.body.style.overflow = 'hidden';
    checkLogin();
    return () => {
      document.body.style.overflow = '';
    };
  }, [navigate]);
  
  const { curIndex, handleChangeIndex } = useClassDataContext();
  
  const [classIdError, classIdErrorError] = useState(false);
  const [inputClassId, setinputClassId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const actions = [
    [{ icon: <DialpadIcon sx={{ color: '#EEEEEE' }} />, name: 'Join by ID' }],
    [{ icon: <EditNoteIcon sx={{ color: '#EEEEEE', fontSize: '32px' }} />, name: 'Prebuild' }, { icon: <FlashOnIcon sx={{ color: '#EEEEEE', fontSize: '30px' }} />, name: 'Quick create' }],
  ];
  const theme = useTheme();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  const handleChangeDialog = () => {
    setDialogOpen(!dialogOpen);
  }

  const handleLogout = () => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/auth/logout',
      withCredentials: true
    }).then((res) => {
      console.log(res.data.logoutState);
      navigate('/login');
    });
  }
  console.log("Debug: curIndex:", curIndex);
  return (

    <Box sx={{ backgroundColor: '#444' }}>
      <HomePageDrawer
        _drawerOpen={drawerOpen} _toggleDrawer={toggleDrawer} clickLogout={handleLogout}
      />
      <HomeSwipeablePanel
       _theme={theme}
      />
      <HomeSpeedDial
        actions={actions}  dialogOpen={dialogOpen} setDialogOpen={handleChangeDialog}
      />
        {curIndex === 0 && (
        <JoinClassByIdDialog
          dialogOpen={dialogOpen} setDialogOpen={handleChangeDialog}

        />
      )}
        {curIndex === 1 && (
        <PrebuildDialog
          dialogOpen={dialogOpen} setDialogOpen={handleChangeDialog}
        />
      )}
      <HomeAppBar _toggleDrawer={toggleDrawer} />
    </Box>

  );
}
export default Home;