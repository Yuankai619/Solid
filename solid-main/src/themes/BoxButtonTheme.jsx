const boxGap = "45px";
const BoxButtonTheme={
    my:boxGap,
    [`@media (max-width:600px)`]: {
      px:"30px",
    },
    [`@media (min-width:601px)`]: { 
      px:"40px",
    },
};

export default BoxButtonTheme;