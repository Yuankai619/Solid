import {createTheme} from '@mui/material/styles';
const Checkboxtheme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', // 您選擇的 Google 字體
        'sans-serif', // 作為後備的系統字體
      ].join(','),
    },
    components: {
      MuiCheckbox:{
        styleOverrides:{
          root:{
            color: '#999999',
            '&$checked': {
              color: '#EEEEEE',  // 選中時的框線顏色
            },
          }
        }
      },
      MuiFormGroup:{
        styleOverrides:{
          root: {
            '& .MuiFormControlLabel-label': {
              color: '#EEEEEE', // 文字顏色
            }
          },
        }
      },
    },
  });

export default Checkboxtheme;
