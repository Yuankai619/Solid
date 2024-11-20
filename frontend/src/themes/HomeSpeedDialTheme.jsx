import { createTheme } from '@mui/material/styles';
const HomeSpeedDialTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiSpeedDial: {
            styleOverrides: {
                root: {
                    // 根元素的样式
                    // '& .MuiSpeedDialIcon-icon': { fontSize: '5rem' },
                    [`@media (max-width:601px)`]: {
                        right: "20px",
                    },
                    [`@media (min-width:601px)`]: {
                        right: "55px",
                    },
                    position: 'absolute',
                    bottom: '82px',
                },
                fab: {
                    // 悬浮按钮的样式
                    backgroundColor: '#2D6CB6',
                    width: '60px',
                    height: '60px',
                },
            },
        },
        MuiSpeedDialAction: {
            styleOverrides: {
                fab: {
                    '&:hover': {
                        // 鼠标悬停的背景颜色
                        backgroundColor: '#2D6CB6',
                    },
                    // '&.Mui-selected': {
                    //   // 选中（点击）状态的背景颜色
                    //   backgroundColor: 'purple',
                    // },
                    // '&.Mui-focusVisible': {
                    //   // 聚焦时的背景颜色
                    //   backgroundColor: 'orange',
                    // },
                    backgroundColor: '#2D6CB6',
                    // '&:click': {
                    //   backgroundColor: 'darkgreen', // 设置鼠标悬停时的背景颜色
                    // },

                    width: '54px',
                    height: '54px',
                }
            },
        },
    }
});

export default HomeSpeedDialTheme;