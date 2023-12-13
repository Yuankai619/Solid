const DividerTheme = {
    '&.MuiDivider-root': {
    '&::before, &::after': {  // 自定義分隔線的樣式
        borderTop: '3px solid #EEEEEE',
    },
    '& .MuiDivider-wrapper': {  //自定義包含文字的部分的樣式
        color: '#EEEEEE',
        fontSize: '18px',
        fontFamily: 'Poppins, sans-serif',
    },
    [`@media (max-width:600px)`]: {
        paddingLeft: '15px', 
        paddingRight: '15px', 
    },
    paddingLeft: '56px', 
    paddingRight: '56px', 
    },
};
export default DividerTheme;