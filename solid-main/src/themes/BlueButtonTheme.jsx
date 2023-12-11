import {createTheme} from '@mui/material/styles';
const WhiteButtonTheme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', // 您選擇的 Google 字體
        'sans-serif', // 作為後備的系統字體
      ].join(','),
    },
    components: {
      MuiButton:{
        styleOverrides:{
          root: {
            fontWeight:'bold',
            borderRadius: 6,
            backgroundColor: '#2D6CB6', // 背景顏色
            color: '#EEEEEE', // 文字顏色
            '&:hover': {
              backgroundColor: '#2D6CB6',
              color: '#EEEEEE',
            },
          },
        }
      },
    },
});

export default WhiteButtonTheme;
