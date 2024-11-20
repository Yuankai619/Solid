import {createTheme} from '@mui/material/styles';
const WhiteButtonTheme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', 
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiButton:{
        styleOverrides:{
          root: {
            fontWeight:'bold',
            borderRadius: 6,
            backgroundColor: '#2D6CB6', 
            color: '#EEEEEE', 
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
