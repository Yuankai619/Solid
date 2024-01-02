import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import HomeAppBarTheme from '../themes/HomeAppBarTheme';
import { useClassDataContext } from '../context/ClassDataContext';
import { AppBar, Tabs, Tab, Box, Toolbar, IconButton } from '@mui/material';

function HomeAppBar(props) {
    const { curIndex, handleChangeIndex } = useClassDataContext();
    const handleTabChange = (event, newValue) => {
        handleChangeIndex(newValue);
    };
    return (
        <ThemeProvider theme={HomeAppBarTheme}>
            <AppBar>
                <Toolbar p={0}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ flexGrow: 0 }}
                        onClick={props._toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Tabs
                            value={curIndex}
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