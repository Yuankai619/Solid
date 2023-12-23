import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
const StreamEditorMessageCardTheme = createTheme({
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
                    fontSize:"12px",
                    color: "#EEEEEE",
                    marginLeft: "12px",
                    marginRight: "12px",
                    marginTop: "16px",
                    
                },
            },
        },
    },
});
function StreamEditorMessageCard({data}) {
    const [selected, setSelected] = useState(data.selected); // Keep track of which button is selected
    const correctEnable = "#3DECAD", correctDisable ="#00764B";
    const incorrectEnable = "#EE592A", incorrectDisable = "#76270E";
    const handleButtonClick = (button) => {
        // If the button is already selected, deselect it, otherwise select it
        setSelected(selected === button ? "null" : button);
    };
    return (
        <ThemeProvider theme={StreamEditorMessageCardTheme}>
            <Card  variant='outlined'>
                <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mx: "10px", width: '28px', height: '28px' }} />
                        <Typography variant="subtitle1" >
                            {data.username}
                        </Typography>
                        <Button aria-label="incorrect"
                            onClick={() => handleButtonClick('incorrect')}
                            sx={{
                                background: selected === 'incorrect' ? incorrectEnable : incorrectDisable,
                                '&:hover': {
                                    background: selected === 'incorrect' ? incorrectEnable : incorrectDisable, // 确保鼠标悬浮时的背景色与点击时相同
                                },
                            }}
                        >
                        </Button>
                        <Button aria-label="correct"
                            onClick={() => handleButtonClick('correct')}
                            sx={{
                                background: selected === 'correct' ? correctEnable : correctDisable,
                                '&:hover': {
                                    background: selected === 'correct' ? correctEnable : correctDisable, // 确保鼠标悬浮时的背景色与点击时相同
                                },
                            }}
                        >
                        </Button>
                    </div>
                    <Typography variant="body1">
                        {data.content}
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
}

export default StreamEditorMessageCard;
