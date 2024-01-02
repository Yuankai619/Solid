import { createTheme } from '@mui/material/styles';
const JoinClassDialogTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    // position: 'absolute',
                    // margin:'0px',
                    // padding:'0px',
                    backgroundColor: '#222222', // 自定义背景颜色
                    width: '450px', // 自定义宽度
                    // 其他样式...
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    // Dialog 标题的样式
                    color: '#EEEEEE', // 自定义文字颜色
                    fontSize: '1.3rem', // 自定义字体大小
                    marginBottom: '0px',
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    marginTop: '20px',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    marginBottom: '10px',
                    // Dialog 操作按钮区域的样式
                    // 可以在这里添加样式
                },
            },
        },
    }
});

export default JoinClassDialogTheme;