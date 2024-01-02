import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import JoinedClassCardContainer from '../components/JoinedClassContainer';
import CreateClassContainer from './CreateClassContainer';
import { ThemeProvider } from '@mui/material/styles';
import HomeSwipeablePanelTheme from '../themes/HomeSwipeablePanelTheme';
import { useClassDataContext } from '../context/ClassDataContext';
function TabPanel(props) {
    const { children, tabIndex, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={tabIndex !== index}
            id={`swipeable-tabpanel-${index}`}
            aria-labelledby={`swipeable-tab-${index}`}
            {...other}
        >
            {tabIndex === index && (
                <Box p={3}>
                    {children}

                </Box>
            )}
        </div>
    );
}

function HomeSwipeablePanel(props) {
    const { curIndex, handleChangeIndex } = useClassDataContext();

    return (
        <ThemeProvider theme={HomeSwipeablePanelTheme}>
            <SwipeableViews
                axis={props._theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={curIndex}
                onChangeIndex={handleChangeIndex}
                style={{ height: 'calc(100dvh - 64px)' }}//讓空白處也可以滑動
            >
                <TabPanel tabIndex={curIndex} index={0} dir={props._theme.direction}>
                    <JoinedClassCardContainer></JoinedClassCardContainer>
                </TabPanel>
                <TabPanel tabIndex={curIndex} index={1} dir={props._theme.direction}>
                    <CreateClassContainer />
                </TabPanel>
            </SwipeableViews>
        </ThemeProvider>
    );
}
export default HomeSwipeablePanel;