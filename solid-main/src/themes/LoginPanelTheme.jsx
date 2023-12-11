import {createTheme} from '@mui/material/styles';
const LoginPanelTheme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', // 您選擇的 Google 字體
        'sans-serif', // 作為後備的系統字體
      ].join(','),
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: '#000000', // 自定義背景顏色
            borderRadius: '24px',      // 自定義邊框圓角
            color: '#EEEEEE',
            //boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
            // 可以添加更多的自定義樣式
          }
        }
      }
    }
  });

export default LoginPanelTheme;
