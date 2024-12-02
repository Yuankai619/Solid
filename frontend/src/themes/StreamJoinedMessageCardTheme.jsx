import { createTheme } from '@mui/material/styles';
const StreamJoinedMessageCardTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    flexShrink: 0,
                    position: 'relative',
                    backgroundColor: "#222222",
                    overflow: 'hidden',
                    margin: "10px 15px 20px",
                    borderRadius: '16px',
                    borderColor: "#999999",
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: "12px 6px 12px 12px !important",
                },
            },
        },
        // 针对 MUI Button 组件的样式
        MuiButton: {
            styleOverrides: {
                root: {
                    marginRight: "16px",
                    minWidth: "36px",
                    height: "24px",
                    padding: "0",
                    borderRadius: "16px",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    marginRight: "16px",
                    minWidth: "36px",
                    height: "24px",
                    padding: "0",
                    borderRadius: "16px",
                    // border: "1px solid #999999",
                },
            },
        },
        // 针对 MUI Typography 组件的样式
        MuiTypography: {
            styleOverrides: {
                subtitle1: {
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: "#EEEEEE",
                    marginLeft: "10px",
                    fontSize: "18px",
                    fontWeight: "700",
                },
                body1: {
                    fontSize: "12px",
                    color: "#EEEEEE",
                    marginLeft: "12px",
                    marginRight: "12px",
                    marginTop: "16px",

                },
            },
        },
    },
});

export default StreamJoinedMessageCardTheme;