const boxGap = "45px";

const BoxTextFieldTheme={
    my:boxGap,
    [`@media (max-width:600px)`]: { 
        px:"30px",
    },
    [`@media (min-width:601px)`]: { 
        px:"70px",
    },
}

export default BoxTextFieldTheme;