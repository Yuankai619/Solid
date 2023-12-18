import { createTheme } from '@mui/material/styles';
const HomeSwipeablePanelTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    color: "#999999",
                    fontWeight: 'bold',
                    fontSize: '15px',
                    '&.Mui-selected': {
                        color: '#EEEEEE',
                    },
                },
            },
        },
        MuiTabs: {
            defaultProps: {
                variant: 'fullWidth',
            },
            styleOverrides: {
                root: {
                    width: '100%',
                    '.MuiTabs-indicator': {
                        backgroundColor: '#EEEEEE',
                    },

                },
            },
        },
    }
});

export default HomeSwipeablePanelTheme;