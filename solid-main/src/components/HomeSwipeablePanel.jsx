import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import JoinedClassCardContainer from '../components/JoinedClassContainer';
import { ThemeProvider } from '@mui/material/styles';
import HomeSwipeablePanelTheme from '../themes/HomeSwipeablePanelTheme';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`swipeable-tabpanel-${index}`}
            aria-labelledby={`swipeable-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}

                </Box>
            )}
        </div>
    );
}

function HomeSwipeablePanel(props) {
    return (
        <ThemeProvider theme={HomeSwipeablePanelTheme}>
            <SwipeableViews
                axis={props._theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={props._value}
                onChangeIndex={props._handleChangeIndex}
                style={{ height: 'calc(100vh - 64px)' }}//讓空白處也可以滑動
            >
                <TabPanel value={props._value} index={0} dir={props._theme.direction}>
                    <JoinedClassCardContainer></JoinedClassCardContainer>
                </TabPanel>
                <TabPanel value={props._value} index={1} dir={props._theme.direction}>
                    <JoinedClassCardContainer></JoinedClassCardContainer>
                </TabPanel>
            </SwipeableViews>
        </ThemeProvider>
    );
}
export default HomeSwipeablePanel;