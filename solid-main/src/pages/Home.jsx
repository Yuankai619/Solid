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

function Home() {
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const [isCompleteCreate, setisCompleteCreate] = useState(false);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/home/auth-success'); // 假设这是您的 API 端点
        console.log(response.data);
        if(response.data == "not_login"){  // 未登入 
          setisLogin(false);
        }
        else if(response.data == 'not_complete_create'){ // 已登入
          setisCompleteCreate(true);
        }else if(response.data == 'login' && response.data == 'complete_create'){
          setisCompleteCreate(true);
          setisLogin(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setisLogin(false);
        setisCompleteCreate(false);
      }
    };
    fetchUserData();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  useEffect(() => {
    if(!isLogin){
      console.log('navigate to profile');
      navigate('/login');
      return;
    }else if(!isCompleteCreate){
      navigate('/updateinfo');
    }else{
      navigate('/home');
    }
  },[isLogin,isCompleteCreate]);
  const [classIdError, classIdErrorError] = useState(false);
  const [inputClassId, setinputClassId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  
  const actions = [
    [{ icon: <DialpadIcon sx={{color:'#EEEEEE'}}/>, name: 'Join class by ID' }],
    [{ icon: <EditNoteIcon sx={{color:'#EEEEEE', fontSize:'32px'}}/>, name: 'Prebuild a quession' }, { icon: <FlashOnIcon sx={{color:'#EEEEEE',  fontSize:'30px'}}/>, name: 'Quick quession' }],
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