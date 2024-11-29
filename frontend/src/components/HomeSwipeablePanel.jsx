import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CreateClassContainer from "./CreateClassContainer";
import HomeSwipeablePanelTheme from "../themes/HomeSwipeablePanelTheme";
import JoinedClassCardContainer from "../components/JoinedClassContainer";
import { useClassDataContext } from "../context/ClassDataContext";
import { useConversationContext } from "../context/ConversationContext";


function HomeSwipeablePanel() {
    const { curIndex } = useClassDataContext();
    const { createdConversations, joinedConversations } = useConversationContext();
    return (
        <ThemeProvider theme={HomeSwipeablePanelTheme}>
            {curIndex == 0 && !joinedConversations.length && (
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
            {curIndex == 0 && joinedConversations.length && (
                <JoinedClassCardContainer conversations={joinedConversations} />
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
            {curIndex == 1 && createdConversations.length && (
                <CreateClassContainer conversations={createdConversations} />
            )}
        </ThemeProvider>
    );
}
export default HomeSwipeablePanel;
