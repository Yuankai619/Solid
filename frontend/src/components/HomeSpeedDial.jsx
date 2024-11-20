import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeSpeedDialTheme from '../themes/HomeSpeedDialTheme';
import { ThemeProvider } from '@mui/material/styles';
import { useClassDataContext } from '../context/ClassDataContext';
function HomeSpeedDial(props) {
    const [open, setOpen] = useState(false);
    const { curIndex } = useClassDataContext();
    const handleActionClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        props.setDialogOpen();
        // setOpen(false);//設定典擊後要不要收合action icon 
        console.log("Action clicked");
    };
    const action = props.actions[curIndex] ;
    // console.log(props.tabIndex);
    // console.log("Selected Actions:", actions);
    const handleClickSpeedDial = () => {
        setOpen(!open);
    };
    // HomeSpeedDialTheme.components.MuiSpeedDial.styleOverrides.fab.backgroundColor='#000';
    return (
        <ThemeProvider theme={HomeSpeedDialTheme}>
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<SpeedDialIcon />}
                open={open}
                onClick={handleClickSpeedDial}
            >
                {action.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        onClick={handleActionClick}
                        tooltipTitle={item.name}
                    />
                ))}
            </SpeedDial>

        </ThemeProvider>
    );
}
export default HomeSpeedDial;