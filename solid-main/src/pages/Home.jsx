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
function Home() {

  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fetchUserData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:4000/auth/auth-state',
          withCredentials: true
        });
        // console.log(response.data);
        console.log(response.data.loginState);
        console.log(response.data.completeCreateState);
        if (response.data.loginState == "LoginFailed") {  // 未登入 
          navigate('/login');
        }
        if (response.data.completeCreateState == 'UnFinishCompleteCreate') { // 已登入
          console.log('navigate to updateinfo');
          navigate('/updateinfo');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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

  const [discussionData, setDiscussionData] = useState([//測試discussionData
    {
      id: 1,
      title: "Card1",
      accessID: "000001",
      infoData: {
        "classID": "001",
        "state": "close",
        "ownerID": "1234556",
        "creat date": "2021/10/10",
        "description": "this is a description"
      }
    },
  ]);

  return (
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
  );
}
export default Home;