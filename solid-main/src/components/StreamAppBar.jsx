import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeAppBarTheme from '../themes/HomeAppBarTheme';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoIcon from '@mui/icons-material/Info';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const StreamAppBarTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#222222',
                },
                root: {
                    position: 'relative',
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    paddingBottom: '10px',
                }

            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    marginTop: '10px',
                    fontWeight: '700',
                    fontSize: '18px',
                    fontFamily: [
                        'Poppins',
                        'sans-serif',
                    ].join(','),
                    // fontWeight: '700',
                },
            },
        },
    }
});
function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hour = date.getHours().toString().padStart(2, '0');
    var minute = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}`;
}
function StreamAppBar({ data }) {
    const navigate = useNavigate();
    // const handleTabChange = (event, newValue) => {
    //     props._setValue(newValue);
    // };
    const [anchorEl, setAnchorEl] = useState(null); // 用于定位 Menu

    // 打开 Menu 的处理函数
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // 关闭 Menu 的处理函数
    const handleClose = () => {
        setAnchorEl(null);
    };
    var createDate = new Date(data.createDate);
    return (
        <ThemeProvider theme={StreamAppBarTheme}>
            <AppBar style={{
                position: 'fixed',
                height: '69px',
                // paddingTop: '6px',
                // marginButtom: '80px',
                left: 0,
                right: 0,
            }}>
                <Toolbar p={0}>
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        onClick={() => {
                            setTimeout(function () {
                                navigate('/home');
                            }, 300);
                        }
                        }
                    // sx={{ flexGrow: 0 }}
                    >
                        <ChevronLeftIcon style={{ color: "#EEEEEE", fontSize: "36px" }} />
                    </IconButton>
                    <Typography variant='h1' sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', fontSize: '26px', fontWeight: "700" }}>
                        {data.title}
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="info"
                        onClick={handleMenuClick}
                        sx={{ flexGrow: 0 }}
                    >
                        <InfoIcon style={{ color: "#EEEEEE", fontSize: "30px" }} />
                    </IconButton>
                    <Menu
                        id="info-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{
                            '& .MuiPaper-root': {
                                borderRadius: '18px',
                                backgroundColor: '#444',
                                color: 'white',
                            },
                        }}
                    >
                        {/* 在此处添加菜单项来显示数据详情 */}
                        <MenuItem 
                            sx={
                                {
                                    cursor: 'default',
                                    backgroundColor: '#444',
                                    '&:hover': {
                                        backgroundColor: '#444',
                                    },
                                }
                            }
                        >
                            <Box >
                                <Typography>
                                    Class ID: {data.classID}
                                </Typography>
                                <Typography>
                                    Class title: {data.title}
                                </Typography>
                                <Typography>
                                    Create Date: 
                                </Typography>
                                <Typography>
                                    {formatDate(createDate)}
                                </Typography>
                                <Typography>
                                    Description:
                                </Typography>
                                <Typography>
                                    {data.description}
                                </Typography>
                            </Box>
                        </MenuItem>
                        {/* 根据需要添加更多的 MenuItem */}
                    </Menu>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
export default StreamAppBar;