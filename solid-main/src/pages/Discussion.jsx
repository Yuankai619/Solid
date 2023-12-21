import React, { useState } from 'react';
import StreamInputPanel from '../components/StreamInputPanel';
import StreamAppBar from '../components/StreamAppBar';
import { useParams, useLocation } from 'react-router-dom';
function Discussion() {
    
    //測試discussionData
    const data = {
        id: 1,
        title: "Card1",
        infoData: {
            "classID": "001",
            "state": "close",
            "ownerID": "1234556",
            "creat date": "2021/10/10",
            "description": "this is a description"
        }
    };
    const location = useLocation();
    const discussionName = location.pathname.split('/')[2];
    // const pageData = data.find(item => item.discussionName === discussionName);
    console.log(data);
    return (
        <div>
            <StreamAppBar roomTitle={data.title} infoData={data.infoData} />
            <StreamInputPanel />
        </div>
    );

}
export default Discussion;
