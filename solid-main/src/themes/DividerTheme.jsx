import { createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
const DividerTheme = {
    '&.MuiDivider-root': {
    '&::before, &::after': {  // 這樣可以自定義分隔線的樣式
        borderTop: '3px solid #EEEEEE',
    },
    '& .MuiDivider-wrapper': {  // 這樣可以自定義包含文字的部分的樣式
        color: '#EEEEEE',
        fontSize: '18px',
        fontFamily: 'Poppins, sans-serif',
    },
    },
};
export default DividerTheme;