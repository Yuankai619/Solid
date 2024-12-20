import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Tabs, Tab, Box, Toolbar, IconButton, Menu, MenuItem, Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

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
                    // paddingBottom: '10px',
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
    const { _id, title, description, createdAt } = data;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };
    var createDate = new Date(createdAt);
    return (
        <ThemeProvider theme={StreamAppBarTheme}>
            <AppBar style={{
                position: 'fixed',
                height: '69px',
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
                        {title}
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
                                    Room ID: {_id.slice(-6)}
                                </Typography>
                                <Typography>
                                    Converation title: {title}
                                </Typography>
                                <Typography>
                                    Create Date: {formatDate(createDate)}
                                </Typography>
                                <Typography sx={{ fontWeight: "500" }}>
                                </Typography>
                                <Typography>
                                    Description:
                                </Typography>
                                <Typography sx={{ fontWeight: "500" }}>
                                    {description}
                                </Typography>
                            </Box>
                        </MenuItem>

                    </Menu>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
StreamAppBar.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};

export default StreamAppBar;