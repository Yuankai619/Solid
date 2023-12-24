import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const StreamJoinedMessageCardTheme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
    components: {
        // 针对 MUI Card 组件的样式
        MuiCard: {
            styleOverrides: {
                root: {
                    position: 'relative',
                    backgroundColor: "#222222",
                    overflow: 'hidden',
                    margin: "10px 15px 20px",
                    borderRadius: '16px',
                    borderColor: "#999999",
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: "12px 6px 12px 12px !important",
                },
            },
        },
        // 针对 MUI Button 组件的样式
        MuiButton: {
            styleOverrides: {
                root: {
                    marginRight: "16px",
                    minWidth: "36px",
                    height: "24px",
                    padding: "0",
                    borderRadius: "16px",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    marginRight: "16px",
                    minWidth: "36px",
                    height: "24px",
                    padding: "0",
                    borderRadius: "16px",
                    // border: "1px solid #999999",
                },
            },
        },
        // 针对 MUI Typography 组件的样式
        MuiTypography: {
            styleOverrides: {
                subtitle1: {
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: "#EEEEEE",
                    marginLeft: "10px",
                    fontSize: "18px",
                    fontWeight: "700",
                },
                body1: {
                    fontSize: "12px",
                    color: "#EEEEEE",
                    marginLeft: "12px",
                    marginRight: "12px",
                    marginTop: "16px",

                },
            },
        },
    },
});
function StreamJoinedMessageCard({ data, classID, setMessageData }) {
    const [isMyMessage, setIsMyMessage] = useState(true); //比對message的userID是不是==自己的userID
    const [isShowScore, setIsShowScore] = useState(true); //要不要顯示score
    const [selected, setSelected] = useState(data.score); // Keep track of which button is selected    
    const [currentUserId, setCurrentUserId] = useState('');
    let a;
    const GetUserInfo = async () => {
        axios({
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },  
          withCredentials: true,
          url: "http://localhost:4000/api/getUserInfo"
        })  
        .then((res) =>{
            console.log('get',res.data._id)
            setCurrentUserId(res.data._id);
            a=res.data._id;
            console.log('gget',a)
            //console.log('gget',currentUserId)
        })
        .catch((error) => {
            
        });
    };
    useEffect(() => {
        async function fetchData() {
            const response = await GetUserInfo();    
        }
        fetchData();
        console.log('jj');
        console.log(a);
        if(currentUserId != data.userID){
            setIsMyMessage(false);
        }else{
            setIsMyMessage(true);
        }
        if (selected === 'null'){
            console.log("???",selected, isMyMessage);
            setIsShowScore(false);
        }
        console.log('+',a)
        console.log(currentUserId,'+',)
    }, []); 
    useEffect(() => {
    }, [selected, isMyMessage]);
    console.log(isShowScore);

    const correctEnable = "#3DECAD", correctDisable = "#00764B";
    const incorrectEnable = "#EE592A", incorrectDisable = "#76270E";

    const avatarSrc = data.isAnonymous === 'true' ? undefined : data.userimg;
    const username = data.isAnonymous === 'true' ? 'Anonymous' : data.username;

    const handleDeleteMessage = async ()  => {//要記得寫setMessageData
        try {
            const response = await axios({
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                data: JSON.stringify({
                    classID: classID,
                    messageID : data.messageid
                }),
                withCredentials: true,
                url: "http://localhost:4000/course/userDeleteMessage"
            });
            if(!response)console.log('error');
            else console.log(response);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
        console.log("delete message");
    };
    const [anonymousState, setAnonymousState] = useState(data.isAnonymous);
    const handleChangeAnonymousState = () => {
        //更改後端資料庫
    }
    const handleChangeAnonymous = (event) => {
        event.stopPropagation();
        setAnonymousState(!anonymousState);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        // setAllowNavigate(false); // 打开 Menu 时禁止跳转F
    };
    const handleClose = () => {
        setAnchorEl(null);
        // setAllowNavigate(true);
    };
    return (
        <ThemeProvider theme={StreamJoinedMessageCardTheme}>
            <Card variant='outlined'>
                <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mx: "10px", width: '28px', height: '28px' }} src={avatarSrc} />
                        <Typography variant="subtitle1" >
                            {username}
                        </Typography>
                        { isShowScore && 
                        <Button aria-label="scroeState"
                            // onClick={() => handleButtonClick('incorrect')}
                            sx={{
                                background: data.score == 'correct' ? correctEnable : incorrectEnable,
                                '&:hover': {
                            background: data.score == 'correct' ? correctEnable : incorrectEnable, // 确保鼠标悬浮时的背景色与点击时相同
                                },
                            }}
                            // disabled={selected==='null'}
                        >
                        </Button>
                        }
                        { isMyMessage &&
                        <IconButton aria-label="menu"
                            // onClick={() => handleButtonClick('incorrect')}
                            sx={{
                                background: "#222222",
                                '&:hover': {
                                    background: "#222222", // 确保鼠标悬浮时的背景色与点击时相同
                                },
                            }}
                            //disabled={selected === 'null'}
                            onClick={handleClickMenu}
                        >
                            <MoreHorizIcon sx={{color:"#999999"}}/>
                        </IconButton>
                        }
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: '#333333',
                                    color: 'white',
                                },
                            }}
                        >
                            <MenuItem onClick={handleChangeAnonymous}>{anonymousState ==true? 'Not Anonymous' : 'Set Anonymous'}</MenuItem>
                            <MenuItem onClick={handleDeleteMessage} sx={{ color: "#CC0000" }}>Delete</MenuItem>
                        </Menu>
                        {/* <Button aria-label="menu"
                            onClick={() => handleButtonClick('correct')}
                            sx={{
                                background: selected === 'correct' ? correctEnable : correctDisable,
                                '&:hover': {
                                    background: selected === 'correct' ? correctEnable : correctDisable, // 确保鼠标悬浮时的背景色与点击时相同
                                },
                            }}
                        >
                        </Button> */}
                    </div>
                    <Typography variant="body1">
                        {data.message}
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}

export default StreamJoinedMessageCard;
