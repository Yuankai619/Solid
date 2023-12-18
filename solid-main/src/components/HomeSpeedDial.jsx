import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { ThemeProvider } from '@mui/material/styles';
import HomeSpeedDialTheme from '../themes/HomeSpeedDialTheme';

function HomeSpeedDial(props) {
    const [open, setOpen] = useState(false);

    const handleActionClick = (event) => {
        event.stopPropagation();
        props._setDialogOpen(true);
        // setOpen(false);//設定典擊後要不要收合action icon 
        // console.log("Action clicked");
    };
    const actions = props._actions[props._tabIndex] ;
    // console.log(props._tabIndex);
    // console.log("Selected Actions:", actions);
    const handleClickSpeedDial = () => {
        setOpen(!open);
    };
    return (
        <ThemeProvider theme={HomeSpeedDialTheme}>
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<SpeedDialIcon />}
                open={open}
                onClick={handleClickSpeedDial}
            >
                {actions.map((action) => (
                    <SpeedDialAction

                        key={action.name}
                        icon={action.icon}
                        onClick={handleActionClick}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>

        </ThemeProvider>
    );
}
export default HomeSpeedDial;