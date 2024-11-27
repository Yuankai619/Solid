import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { useUserInfo } from "../context/UserInfoContext";
import { useAuth } from "../context/AuthContext";
import {
    Typography, Box, Drawer, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Avatar
} from '@mui/material';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomePageDrawerTheme from '../themes/HomePageDrawerTheme';

import PropTypes from "prop-types";

function HomePageDrawer({ _drawerOpen, _toggleDrawer }) {
    const { userInfo, refetchUserInfo } = useUserInfo();
    const { logout } = useAuth();
    const userName = userInfo?.userName;
    const studentId = userInfo?.studentId;
    const avatarUrl = userInfo?.avatarUrl;
    useEffect(() => {
        console.log("HomePageDrawer mounted");
        async () => {
            if (!userInfo) {
                console.log("HomePageDrawer: userInfo is null");
                refetchUserInfo();
            }
        }
    }, [userInfo, refetchUserInfo]);
    const handleLogout = async () => {
        await logout();
    }
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={HomePageDrawerTheme}>
            <Drawer open={_drawerOpen} onClose={_toggleDrawer(false)}>
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
                                <Avatar src={avatarUrl} style={{ marginRight: '22px', width: '50px', height: '50px' }} />
                                <Box>
                                    <Typography style={{ fontSize: "18px", fontWeight: "bold" }} >{userName}</Typography>
                                    <Typography style={{ fontSize: "12px", color: "#999999" }}>ID: {studentId}</Typography>
                                </Box>
                            </ListItem>
                            {/* <ListItemButton onClick={() => navigate('/home')}>
                                <ListItemIcon><HomeIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton> */}
                            <ListItemButton onClick={() => navigate('/profile')} >
                                <ListItemIcon><AccountBoxIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                            {/* <ListItemButton>
                                <ListItemIcon><BarChartIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Statistics" />
                            </ListItemButton> */}
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon><ExitToAppIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </List>
                    </Box>
                    {/* <Box>
                        <List>
                            <ListItemButton onClick={clickLogout}>
                                <ListItemIcon><ExitToAppIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </List>
                    </Box> */}
                </Box>
            </Drawer>

        </ThemeProvider>
    );
}
HomePageDrawer.propTypes = {
    _drawerOpen: PropTypes.bool.isRequired,
    _toggleDrawer: PropTypes.func.isRequired,
};
export default HomePageDrawer;