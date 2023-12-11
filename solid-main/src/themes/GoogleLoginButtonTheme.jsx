import {createTheme} from '@mui/material/styles';
const GoogleLoginButtonTheme = createTheme({
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
            
            // width:'75%',
            fontWeight:'bold',
            borderRadius: 6,
            borderColor:'#EEEEEE',
            // backgroundColor: '#EEEEEE', // 背景顏色
            color: '#EEEEEE', // 文字顏色
            '&:hover': {
            //   backgroundColor: '#EEEEEE',
              color: '#EEEEEE',
            },
          },
        }
      },
    },
});

export default GoogleLoginButtonTheme;
