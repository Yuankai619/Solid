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
function HomeAppBar(props) {
    const handleTabChange = (event, newValue) => {
        props._setValue(newValue);
    };
    return (
        <ThemeProvider theme={HomeAppBarTheme}>
            <AppBar>
                <Toolbar p={0}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={props._toggleDrawer(true)}
                        sx={{ flexGrow: 0 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Tabs
                            value={props._value}
                            onChange={handleTabChange}
                            aria-label="full width tabs"
                        >
                            <Tab label="Joined Class" />
                            <Tab label="Created Class" />
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
export default HomeAppBar;