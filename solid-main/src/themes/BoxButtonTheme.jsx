const boxGap = "45px";
const BoxButtonTheme={
    my:boxGap,
    [`@media (max-width:600px)`]: {
      px:"50px",
    },
    [`@media (min-width:601px)`]: { 
      px:"120px",
    },
};

export default BoxButtonTheme;