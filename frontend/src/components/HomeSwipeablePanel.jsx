import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// import SwipeableViews from 'react-swipeable-views';
import CreateClassContainer from "./CreateClassContainer";
import HomeSwipeablePanelTheme from "../themes/HomeSwipeablePanelTheme";
import JoinedClassCardContainer from "../components/JoinedClassContainer";
import { useClassDataContext } from "../context/ClassDataContext";

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
            {tabIndex === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

function HomeSwipeablePanel(props) {
    const { curIndex, handleChangeIndex, joinedClassData, createdClassData } =
        useClassDataContext();

    return (
        <ThemeProvider theme={HomeSwipeablePanelTheme}>
            <div
                // axis={props._theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                // index={curIndex}
                // onChangeIndex={handleChangeIndex}
                style={{ height: "calc(100dvh - 64px)" }} //讓空白處也可以滑動
            >
                <TabPanel
                    tabIndex={curIndex}
                    index={0}
                    dir={props._theme.direction}
                >
                    {!joinedClassData.length && (
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                textAlign: "center",
                                color: "#CCCCCC",
                                marginTop: "160px",
                                fontWeight: "600",
                            }}
                        >
                            You haven't joined any class yet.
                        </Typography>
                    )}
                    <JoinedClassCardContainer />
                </TabPanel>
                <TabPanel
                    tabIndex={curIndex}
                    index={1}
                    dir={props._theme.direction}
                >
                    {!createdClassData.length && (
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                textAlign: "center",
                                color: "#CCCCCC",
                                marginTop: "160px",
                                fontWeight: "600",
                            }}
                        >
                            You haven't created any class yet.
                        </Typography>
                    )}
                    <CreateClassContainer />
                </TabPanel>
            </div>
        </ThemeProvider>
    );
}
export default HomeSwipeablePanel;
