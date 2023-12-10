import {createTheme} from '@mui/material/styles';
const LoginPanelTheme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', // 您選擇的 Google 字體
        'sans-serif', // 作為後備的系統字體
      ].join(','),
    },
    components: {
        MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: '24px',  // 自定義邊框圓角
                backgroundColor: '#222222',  // 自定義背景顏色
                color: '#EEEEEE',
                elevation:10,
                padding: '20px',            // 自定義內邊距
                margin: '15px',             // 自定義外邊距
                // 在這裡可以添加更多自定義樣式
            }
        } 
        }
    },
  });

export default LoginPanelTheme;
