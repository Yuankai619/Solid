import { useState } from 'react';
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
import PrebuildDialog from '../components/PrebuildDialog';
import { ClassDataProvider } from '../context/ClassDataContext';
import { useClassDataContext } from '../context/ClassDataContext';
import { Container } from '@mui/material';
import { useSystem } from '../context/SystemContext';
function Home() {
  const { curIndex, handleChangeIndex } = useClassDataContext();
  const [classIdError, classIdErrorError] = useState(false);
  const [inputClassId, setinputClassId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const actions = [
    [{ icon: <DialpadIcon sx={{ color: '#EEEEEE' }} />, name: 'Join by ID' }],
    [{ icon: <EditNoteIcon sx={{ color: '#EEEEEE', fontSize: '32px' }} />, name: 'Prebuild' }],// { icon: <FlashOnIcon sx={{ color: '#EEEEEE', fontSize: '30px' }} />, name: 'Quick create' }],
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


  return (

    <Box sx={{ backgroundColor: '#444', height: '100dvh' }}>
      <HomePageDrawer
        _drawerOpen={drawerOpen} _toggleDrawer={toggleDrawer}
      />
      <HomeSwipeablePanel />
      <HomeSpeedDial
        actions={actions} dialogOpen={dialogOpen} setDialogOpen={handleChangeDialog}
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