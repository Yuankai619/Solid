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
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function StreamAppBar({ data }) {
    const navigate = useNavigate();
    // const handleTabChange = (event, newValue) => {
    //     props._setValue(newValue);
    // };
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
        }
    });
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
                        onClick={()=>{
                            setTimeout(function() {
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
                        aria-label="menu"
                        // onClick={props._toggleDrawer(true)}
                        sx={{ flexGrow: 0 }}
                    >
                        <InfoIcon style={{ color: "#EEEEEE", fontSize: "30px" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
export default StreamAppBar;