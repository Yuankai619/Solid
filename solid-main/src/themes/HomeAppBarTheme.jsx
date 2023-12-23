
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
                    position: 'relative',
                    paddingBottom: 'env(safe-area-inset-bottom)',
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
                    '.MuiTabs-indicator': {
                        backgroundColor: '#EEEEEE',
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