
import { createTheme } from '@mui/material/styles';
const HomeAppBarTheme = createTheme({
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
                    backgroundColor: '#000000',
                },
                root: {
                    position: 'fixed',
                    marginTop: '100dvh',
                    marginTop:'calc(100dvh - 64px)',
                    
                    // bottom: 0,
                    // left: 0,
                    // right: 0,
                    // paddingBottom: 'env(safe-area-inset-bottom)',
                    paddingBottom: '15px',
                }

            },
        },
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
                    // paddingRight: '10px',
                    // paddingLeft: '10px',
                    '.MuiTabs-indicator': {
                        backgroundColor: '#EEEEEE',
                        height: '3px',  // 設定底線的粗細
                    },

                },
            },
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'black', // 工具提示背景颜色
                    color: 'white', // 工具提示文字颜色
                },
            },
        },
    }
});
export default HomeAppBarTheme;