import {createTheme} from '@mui/material/styles';
const ButtonTheme = createTheme({
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
            borderRadius: 6,
            backgroundColor: '#EEEEEE', // 背景顏色
            color: '#2D6CB6', // 文字顏色
            '&:hover': {
              backgroundColor: '#EEEEEE',
              color: '#2D6CB6',
            },
          },
        }
      },
    },
});

export default ButtonTheme;
