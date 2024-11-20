import {createTheme} from '@mui/material/styles';
const LoginContainerTheme = createTheme({
      components: {
        MuiContainer: {
          styleOverrides: {
            root: {
              // height: '560px',
              [`@media (max-width:600px)`]: {
                width:"330px",
              },
              [`@media (min-width:601px)`]: { 
                width:"500px",
              },
              [`@media (min-width:901px)`]: { 
                width:"530px",
              },
              backgroundColor: '#222222', 
              borderRadius: '24px',      
              color: '#EEEEEE',
              paddingTop: '5px',
              paddingBottom: '30px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 1)', 
            }
          },
        },

      }
  });

export default LoginContainerTheme;
