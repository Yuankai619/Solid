import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ThemeProvider } from '@mui/material/styles';
import HomePageDrawerTheme from '../themes/HomePageDrawerTheme';
import { useNavigate } from "react-router-dom";

function HomePageDrawer(props) {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={HomePageDrawerTheme}>
            <Drawer open={props._drawerOpen} onClose={props._toggleDrawer(false)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '250px',
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <List>
                            <ListItem>
                                <Avatar style={{ marginRight: '22px', width: '50px', height: '50px' }} /> 
                                <Box>
                                    <Typography style={{ fontSize: "18px", fontWeight: "bold" }} >Username</Typography>
                                    <Typography style={{ fontSize: "12px", color: "#999999" }}>ID: 000000000</Typography>
                                </Box>
                            </ListItem>
                            <ListItemButton>
                                <ListItemIcon><HomeIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Home" onClick={() => navigate('/home')}/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><SettingsIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Setting" onClick={() => navigate('/profile')} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><BarChartIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Statistics" />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box>
                        <List>
                            <ListItemButton>
                                <ListItemIcon><ExitToAppIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

        </ThemeProvider>
    );
}
export default HomePageDrawer;