import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { red, green } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

function StreamEditorMessageCard({ username, content }) {
    return (
        <Card sx={{ maxWidth: '100%', bgcolor: 'background.paper', overflow: 'hidden' }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Avatar sx={{ mr: 2 }} />
                    <Typography variant="subtitle1" sx={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {"Yuankai"}
                    </Typography>
                    <Button aria-label="dislike"
                        size="small"
                        sx={{
                            bgcolor: red[500],
                            '&:hover': { bgcolor: red[700] },
                            borderRadius: 6, // 這裡設置圓角大小
                            width: 20, // 設置寬度，'auto' 或者具體數值
                            height: 15, // 設置高度，可按需調整
                            padding: '0 1px', // 左右內填充，根據按鈕內容增加或減少
                        }}>
                        {/* <CancelIcon style={{ color: 'white' }} /> */}
                    </Button>
                    <Button variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '4px', // 为按钮添加圆角
                            minWidth: 90, // 设置最小宽度，确保按钮是长方形的
                            height: 36, // 设置按钮高度
                            padding: '0 16px', // 水平方向的内填充
                            '&:hover': {
                                bgcolor: 'hover color here', // 鼠标悬浮时的背景颜色
                            },
                        }}>
                        {/* <CheckCircleIcon style={{ color: 'white' }} /> */}
                    </Button>
                </div>
                <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                    {"這裡是你的消息內容，可以非常長，組件會自動處理換行和高度fdsfsdfsdfsdfsfsdf調整。"}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default StreamEditorMessageCard;
