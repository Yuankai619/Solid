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
function Home() {

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
  
  const [classIdError, classIdErrorError] = useState(false);
  const [inputClassId, setinputClassId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
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
  const handleChangeIndex = (index) => {
    console.log(index);
    setTabIndex(index);
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

  return (
    <ClassDataProvider>
    <Box sx={{ backgroundColor: '#444' }}>
      <HomePageDrawer
        _drawerOpen={drawerOpen} _toggleDrawer={toggleDrawer} clickLogout={handleLogout}
      />
      <HomeSwipeablePanel
        tabIndex={tabIndex} _handleChangeIndex={handleChangeIndex} _theme={theme}
      />
      <HomeSpeedDial
        actions={actions} tabIndex={tabIndex} dialogOpen={dialogOpen} setDialogOpen={handleChangeDialog}
      />
      {tabIndex === 0 && (
        <JoinClassByIdDialog
          label={"class ID"} errorText={"class id is invalid"} iserror={classIdError}
          dialogOpen={dialogOpen} setDialogOpen={handleChangeDialog}

        />
      )}
      {tabIndex === 1 && (
        <PrebuildDialog
          dialogOpen={dialogOpen} setDialogOpen={handleChangeDialog}
        />
      )}
      <HomeAppBar _value={tabIndex} _setValue={setTabIndex} _toggleDrawer={toggleDrawer} />
    </Box>
    </ClassDataProvider>
  );
}
export default Home;