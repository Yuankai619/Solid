import { createTheme } from '@mui/material/styles';
const JoinedClassCardTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins', // 您選擇的 Google 字體
            'sans-serif', // 作為後備的系統字體
        ].join(','),
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: [
                        'Poppins', // 您選擇的 Google 字體
                        'sans-serif', // 作為後備的系統字體
                    ].join(','),
                    // fontWeight: '700',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    paddingBottom: '10px',
                    paddingTop: '10px',
                    paddingRight: '20px',
                    paddingLeft: '10px',
                    marginBottom: '23px',
                    marginTop: '13px',
                    marginRight: '27px',
                    marginLeft: '27px',
                    borderRadius: '24px',
                    backgroundColor: '#EEEEEE',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'black', // 菜单背景色
                    color: 'white',           // 菜单文字颜色
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#000',  // IconButton颜色
                    '&:hover': {
                        backgroundColor: 'lightblue', // 鼠标悬停时的背景色
                    },
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                default: { variant: 'h2' },
                title: {
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',

                },
                root: {
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    paddingRight: '0px',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontWeight: '520',
                    color: '#EEEEEE',
                },
            },
        },
    },
});

export default JoinedClassCardTheme;