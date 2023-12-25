import React, { useState, useEffect,useRef } from 'react';
import StreamInputPanel from '../components/StreamInputPanel';
import StreamAppBar from '../components/StreamAppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useLocation } from 'react-router-dom';
import LoginChecker from '../checker/LoginChecker';
import { useNavigate } from 'react-router-dom';
import StreamJoinedMessageCard from '../components/StreamJoinedMessageCard';
import axios from 'axios';
import io from 'socket.io-client'
let socket = io.connect(`${process.env.REACT_APP_API_URL}`)

function JoinedDisscussion() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginCheckComplete, setIsLoginCheckComplete] = useState(false);
    const location = useLocation();
    const ClassID = location.pathname.split('/')[2];
    const [classData, setClassData] = useState([]);

    const [messageData, setMessageData] = useState([
        // { id: 1, isAnonymous: false, messageID: "001", username: "Yuankai", selected: "null", message: "可出田者吃裏的。候南活蛋，根給羽封追禾抱怕木游北棵秋很申勿美，快見魚樹升自衣汁背風也高日休乍：毛裝扒不品祖奶冰虎背同要次路跳！那尺或老子幫功拉比：弓想止「流」門扒鳥久。" },
        // { id: 2, isAnonymous: true, messageID: "002", username: "BOB", selected: "true", message: "少生不會寺許送房，風來可北几玉冰麼土個急枝貫戶掃童化，現根旁杯追樹見，星父父快雄次園氣面書壯民做麻怪河園？世連買她天怎紅和食邊植正、做節皮樹雨民我玩經！辛冒時平游。" },
        // { id: 3, isAnonymous: false, messageID: "003", username: "Python", selected: "false", message: "飯布羽飯久兆卜科二內打姐休姊斗造平、後方給肉新娘昔米片也即抓個世左放點做定沒：朱反空奶收斤草語？耳就半。更息已媽。" }
    ]);


    const joinRoom = () =>{
        socket.emit('join_room',ClassID);
    }
   

    useEffect(() => {
        joinRoom();
        socket.on('refresh',(data)=>{
            setTimeout(function() {
                // 在這裡寫入您希望在等待後執行的程式碼
                fetchClassData();
                //console.log('0.1 秒已過');
            }, 150);
        //    document.location.reload();
        })
    }, [socket]);
    //test Data
    
    
    //fetch class data
    
    useEffect(() => {
        const checkLogin = async () => {
            const result = await LoginChecker();
            setIsLoggedIn(result.isLoggedIn);
            setIsLoginCheckComplete(true);
            if (result.redirectTo) {
                window.location.assign(result.redirectTo);//刷新當前頁
            }
        };
        document.body.style.overflow = 'hidden';
        document.body.style.background = "#222222";
        checkLogin();
        fetchClassData();
        return () => {
            console.log('return');
            // document.body.style.background = '';
            document.body.style.overflow = '';
        };
    }, []);

    const fetchClassData = async () => {
        //alert('ji');
        // console.log('pp')
        try {
            console.log(ClassID);
            const response = await axios({
                method: "POST",
                headers: { 'Content-Type': 'application/json', },
                data: JSON.stringify({
                    classID: ClassID
                }),
                withCredentials: true,
                url: `${process.env.REACT_APP_API_URL}/course/loadClassAll`
            });
            // console.log('uu',response,'uu');
            setClassData(response.data.info);
            setMessageData(response.data.message);
            console.log('ppsdasdasda')
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    const handleSetMessageData = (newMessageData) => {
        setMessageData(newMessageData);
    }
    // const scrollRef = useRef(null);//預設載入時滾動條在最下面
    // useEffect(() => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    //     }
    // }, [messageData]);
    return (
        <div style={{ padding: 0, margin: "0px" }}>
            <StreamAppBar data={classData} />
            <div style={{ paddingTop: '70px' }}>
                <Container  sx={{ position: 'fixed', height: 'calc(100vh - 252px)', overflow: "auto", px: "0px", paddingBottom:"32px"}} maxWidth="100%">
                    {messageData.map((data, index) => (
                        <StreamJoinedMessageCard
                            key={index}
                            data={data}
                            classID={ClassID}
                            setMessageData={handleSetMessageData}
                        />
                    ))}
                </Container>
            </div>

            <StreamInputPanel classID={ClassID} />
        </div>
    );

}
export default JoinedDisscussion;
