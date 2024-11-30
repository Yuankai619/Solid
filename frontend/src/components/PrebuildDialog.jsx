import React, { useState, useEffect } from "react";
import {
    ThemeProvider,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Slide,
    Box,
    FormControlLabel,
    Typography,
    Switch,
} from "@mui/material";
import InputText from "./InputText";
import PrebuildDialogTheme from "../themes/PrebuildDialogTheme";
import { useConversationContext } from "../context/ConversationContext";
import { useUserInfo } from "../context/UserInfoContext";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PrebuildDialog(props) {
    const { userInfo } = useUserInfo();
    const { handleCreateConversation } = useConversationContext();
    const userId = userInfo?._id;
    const handleCreate = async () => {
        console.log("handleCreate");
        if (!roomTitle) {
            setRoomTitleError(true);
            return;
        }
        props.setDialogOpen();
        const payload = {
            ownerId: userId,
            state: state.gilad,
            title: roomTitle,
            description: description,
            participants: [],
            messages: [],
        };
        await handleCreateConversation(payload);

    };

    //switch setting
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
    //switch setting
    const [roomTitle, setRoomTitle] = useState("");
    const [roomTitleError, setRoomTitleError] = useState(false);
    const [description, setDescription] = useState("");
    // const [open, setOpen] = useState(true);
    const [inputFocused, setInputFocused] = useState(false);
    useEffect(() => {
        if (roomTitle) {
            setRoomTitleError(false);
        }
    }, [roomTitle]);
    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };
    return (
        <ThemeProvider theme={PrebuildDialogTheme}>
            <React.Fragment>
                <Dialog
                    open={props.dialogOpen}
                    onClose={props.setDialogOpen}
                    TransitionComponent={Transition}
                >
                    <DialogTitle>Prebuild Discussion</DialogTitle>
                    <DialogContent>
                        <Box sx={{ marginTop: "10px" }}>
                            <Typography
                                sx={{ color: "#EEEEEE", marginButtom: "20px" }}
                            >
                                {"Discussion Title:"}
                            </Typography>
                            <InputText
                                id={"room title"}
                                value={roomTitle}
                                placeholder="your title ?"
                                onChange={(e) => setRoomTitle(e.target.value)}
                                iserror={roomTitleError}
                                errorText={"Title cant't be empty"}
                                isrequired={true}
                            ></InputText>
                        </Box>
                        <Box sx={{ margin: "20px 0px 20px" }}>
                            <Typography
                                sx={{ color: "#EEEEEE", marginButtom: "20px" }}
                            >
                                {"Description:"}
                            </Typography>
                            <TextField
                                multiline
                                fullWidth
                                variant="outlined"
                                placeholder="your description ?"
                                value={description}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                rows={inputFocused ? 4 : 2}
                                style={{
                                    margin: "10px 0",
                                    borderColor: "#EEEEEE",
                                }}
                                InputProps={{
                                    style: {
                                        color: "#EEEEEE",
                                        padding: "15px", // 這裡增加padding來調整文字和框的間距
                                    },
                                }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Box>
                        <FormControlLabel
                            sx={{ color: "#EEEEEE" }}
                            control={
                                <Switch
                                    checked={state.gilad}
                                    onChange={handleChange}
                                    name="gilad"
                                />
                            }
                            label="Set to open"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={props.setDialogOpen}
                            sx={{
                                color: "#EEEEEE",
                                marginRight: "30px",
                                fontSize: "1rem",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreate}
                            sx={{
                                fontWeight: "bold",
                                marginRight: "30px",
                                fontSize: "1.2rem",
                            }}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}
export default PrebuildDialog;
