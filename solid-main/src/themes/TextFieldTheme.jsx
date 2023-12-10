import { createTheme } from '@mui/material/styles';

const TextFieldTheme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            color: '#EEEEEE',
          },
          "input::-ms-reveal, input::-ms-clear": {//Prevent eye icon from appearing in the default password field
            display: "none"
          },
          '& label.Mui-focused': {
            color: '#EEEEEE',
          },
          '& label': {
            color: '#999999',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#999999',
            },
            '&:hover fieldset': {
              borderColor: '#EEEEEE',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#EEEEEE',
            },
          },
        },
      },
    },
  },
});

export default TextFieldTheme;
