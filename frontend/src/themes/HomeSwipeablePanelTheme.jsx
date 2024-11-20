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
                        height: '9px',  // 設定底線的粗細
                        width: '50%',    // 設定底線的寬度
                    },
                    

                },
                
            },
        },
    }
});

export default HomeSwipeablePanelTheme;