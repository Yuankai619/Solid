// ClassDataContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const ClassDataContext = createContext();
export const useClassDataContext = () => useContext(ClassDataContext);

export const ClassDataProvider = ({ children }) => {
    const [curIndex, setCurIndex] = useState(0);

    const handleChangeIndex = (index) => {
        console.log("handleChangeIndex: ", index);
        setCurIndex(index);
    };
    const [joinedCLassData, setJoinedClassData] = useState([
        // { id: 1, title: "Card1", classID: "001", state: "close" },
        // { id: 2, title: "Card2", classID: "002", state: "open" },
        // { id: 3, title: "Card3", classID: "003", state: "close" },
    ]);
    const handleNewJoinedClass = newClass => {
        setJoinedClassData(prev => [...prev, newClass]);
    };
    const [createdClassData, setCreatedClassData] = useState([
        // { id: 1, title: "Card1", classID: "001", state: "close" },
        // { id: 2, title: "Card2", classID: "002", state: "open" },
        // { id: 3, title: "Card3", classID: "003", state: "close" },
    ]);
    //fetch class data
    useEffect(() => {
        console.log('test');
        const fetchClassData = async () => {
            try {

                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:4000/course/getCreatedClass',
                    withCredentials: true
                });
                const modifiedData = response.data.map(item => ({//加入id
                    ...item,
                    id: parseInt(item.classID)
                }));
                console.log("sd;", modifiedData);
                setCreatedClassData(modifiedData);
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };
        fetchClassData();
    }, []);
    // //
    const handleNewCreatedClass = newClass => {
        setCreatedClassData(prev => [...prev, newClass]);
    };

    const handleChangeCreatedClassState = (id, newState) => {
        setCreatedClassData(prevClassData =>
            prevClassData.map(data =>
                data.id === id ? { ...data, state: newState } : data
            )
        );
        //alert(newState);
        axios({
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            data: JSON.stringify({
                classID: id,
                state: newState
            }),
            withCredentials: true,
            url: "http://localhost:4000/course/changeState"
        })
            .then((res) => { })
            .catch((error) => { console.error(error); });
    };

    const handleDeleteCreatedClass = id => {
        setCreatedClassData(prevClassData =>
            prevClassData.filter(data => data.id !== id)
        );
        axios({
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            data: JSON.stringify({
                classID: id
            }),
            withCredentials: true,
            url: "http://localhost:4000/course/deleteClass"
        })
            .then((res) => { })
            .catch((error) => { console.error(error); });
        axios({
            method: "POST",
            headers: { 'Content-Type': 'application/json', },
            data: JSON.stringify({
                classID: id
            }),
            withCredentials: true,
            url: "http://localhost:4000/course/deleteClassFromUser"
        })
            .then((res) => { })
            .catch((error) => { console.error(error); });
    };

    
    return (
        <ClassDataContext.Provider value={{
            curIndex, setCurIndex, handleChangeIndex,
            joinedCLassData, handleNewJoinedClass,
            createdClassData, handleNewCreatedClass, handleChangeCreatedClassState, handleDeleteCreatedClass,
        }}>
            {children}
        </ClassDataContext.Provider>
    );
};
