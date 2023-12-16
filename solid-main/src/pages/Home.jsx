import React, { useState,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import JoinedClassCardContainer from '../components/JoinedClassContainer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`swipeable-tabpanel-${index}`}
      aria-labelledby={`swipeable-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
          
        </Box>
      )}
    </div>
  );
}



function Home(){
  
  useEffect(() => {
    // 当组件挂载时执行
    document.body.style.overflow = 'hidden';

    // 当组件卸载时执行的清理函数
    return () => {
      document.body.style.overflow = '';
    };
  }, []); // 空依赖数组 [] 表示这个 effect 只在组件挂载和卸载时运行

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];
  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static" color="default">
        <Toolbar p={0}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ flexGrow: 0 }} // 汉堡菜单图标不参与 flex 布局
          >
            <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ width: '100%' }}
          aria-label="full width tabs"
        >
          <Tab label="Joined Class" />
          <Tab label="Created Class" />
        </Tabs>
        </Box>
      </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
            {/* 可以添加更多的列表项 */}
          </List>
        </Box>
      </Drawer>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ height: 'calc(100vh - 48px)' }}//讓空白處也可以滑動
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <JoinedClassCardContainer></JoinedClassCardContainer>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <JoinedClassCardContainer></JoinedClassCardContainer>
        </TabPanel>
      </SwipeableViews>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default Home;

