import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import HomeAppBarTheme from '../themes/HomeAppBarTheme';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function StreamAppBar({ roomTitle, infoData }) {
    const navigate = useNavigate();
    // const handleTabChange = (event, newValue) => {
    //     props._setValue(newValue);
    // };
    return (
        <ThemeProvider theme={HomeAppBarTheme}>
            <AppBar>
                <Toolbar p={0}>
                    <IconButton
                        
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={()=>navigate('/home')}
                        sx={{ flexGrow: 0 }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant='h1'  sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center',fontSize:'2rem', fontWeight:"700" }}> 
                        {roomTitle} 
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        // onClick={props._toggleDrawer(true)}
                        sx={{ flexGrow: 0 }}
                    >
                        <InfoIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
export default StreamAppBar;