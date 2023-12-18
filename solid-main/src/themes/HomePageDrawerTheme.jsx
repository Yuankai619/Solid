import { createTheme } from '@mui/material/styles';


const HomePageDrawerTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#222222',
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    marginTop: '0px',
                    paddingTop: '0px',
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    color: '#EEEEEE',
                    paddingTop: '0px',
                    marginBottom: '32px',
                    backgroundColor: '#2D6CB6',
                    height: '100px',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: '#EEEEEE',
                    marginTop: '32px',
                    marginBottom: '32px',
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    marginLeft: '15px',
                }
            }
        }
    }
});

export default HomePageDrawerTheme;
