import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CreateClassContainer from "./CreateClassContainer";
import HomeSwipeablePanelTheme from "../themes/HomeSwipeablePanelTheme";
import JoinedClassCardContainer from "../components/JoinedClassContainer";
import { useClassDataContext } from "../context/ClassDataContext";
import { useConversationContext } from "../context/ConversationContext";


function HomeSwipeablePanel() {
    const { curIndex, handleChangeIndex, joinedClassData, createdClassData } =
        useClassDataContext();
    const { createdConversations } = useConversationContext();
    return (
        <ThemeProvider theme={HomeSwipeablePanelTheme}>
            {curIndex == 0 && !joinedClassData.length && (
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        color: "#CCCCCC",
                        paddingTop: "160px",
                        fontWeight: "600",
                    }}
                >
                    You haven't joined any class yet.
                </Typography>
            )}
            {curIndex == 0 && joinedClassData.length && (
                <JoinedClassCardContainer conversations={joinedClassData} />
            )}

            {curIndex == 1 && !createdConversations.length && (
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        color: "#CCCCCC",
                        paddingTop: "160px",
                        fontWeight: "600",
                    }}
                >
                    You haven't created any class yet.
                </Typography>
            )}
            {curIndex == 1 && createdConversations && (
                <CreateClassContainer conversations={createdConversations} />
            )}
        </ThemeProvider>
    );
}
export default HomeSwipeablePanel;
