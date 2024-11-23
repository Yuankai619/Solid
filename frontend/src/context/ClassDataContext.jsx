// ClassDataContext.js
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const ClassDataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useClassDataContext = () => useContext(ClassDataContext);

export const ClassDataProvider = ({ children }) => {
    const [curIndex, setCurIndex] = useState(0);

    const handleChangeIndex = (index) => {
        console.log("handleChangeIndex: ", index);
        setCurIndex(index);
    };
    const [joinedClassData, setJoinedClassData] = useState([
        // { id: 1, title: "Card1", classID: "001", state: "close" },
        // { id: 2, title: "Card2", classID: "002", state: "open" },
        // { id: 3, title: "Card3", classID: "003", state: "close" },
    ]);
    const checkJoinedClassIDExist = (classID) => {
        return joinedClassData.some(
            (classData) => classData.classID === classID
        );
    };

    const handleNewJoinedClass = (newClass) => {
        setJoinedClassData((prev) => [...prev, newClass]);
    };

    const [createdClassData, setCreatedClassData] = useState([
        // { id: 1, title: "Card1", classID: "001", state: "close" },
        // { id: 2, title: "Card2", classID: "002", state: "open" },
        // { id: 3, title: "Card3", classID: "003", state: "close" },
    ]);
    const handleDeleteJoinedClass = (id) => {
        setJoinedClassData((prevClassData) =>
            prevClassData.filter((data) => data.id !== id)
        );
        // axios({
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     data: JSON.stringify({
        //         classID: id,
        //     }),
        //     withCredentials: true,
        //     url: `${process.env.REACT_APP_API_URL}/course/userPullJoinedClass`,
        // })
        //     .then((res) => {})
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };
    //fetch class data
    useEffect(() => {
        console.log("test");
        // const fetchClassData = async () => {
        //     try {
        //         const response = await axios({
        //             method: "get",
        //             url: `${process.env.REACT_APP_API_URL}/course/getCreatedClass`,
        //             withCredentials: true,
        //         });
        //         const modifiedData = response.data.map((item) => ({
        //             //加入id
        //             ...item,
        //             id: parseInt(item.classID),
        //         }));
        //         console.log("sd;", modifiedData);
        //         setCreatedClassData(modifiedData);
        //     } catch (error) {
        //         console.error("Error fetching class data:", error);
        //     }
        // };
        // const fetchJoinedClassData = async () => {
        //     try {
        //         const response = await axios({
        //             method: "get",
        //             url: `${process.env.REACT_APP_API_URL}/course/getJoinedClass`,
        //             withCredentials: true,
        //         });
        //         const modifiedData = response.data.map((item) => ({
        //             //加入id
        //             ...item,
        //             id: parseInt(item.classID),
        //         }));
        //         console.log("sd;", modifiedData);
        //         setJoinedClassData(modifiedData);
        //     } catch (error) {
        //         console.error("Error fetching class data:", error);
        //     }
        // };
        // fetchJoinedClassData();
        // fetchClassData();
    }, []);
    // //
    const handleNewCreatedClass = (newClass) => {
        setCreatedClassData((prev) => [...prev, newClass]);
    };

    const handleChangeCreatedClassState = (id, newState) => {
        setCreatedClassData((prevClassData) =>
            prevClassData.map((data) =>
                data.id === id ? { ...data, state: newState } : data
            )
        );
        //alert(newState);
        // axios({
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     data: JSON.stringify({
        //         classID: id,
        //         state: newState,
        //     }),
        //     withCredentials: true,
        //     url: `${process.env.REACT_APP_API_URL}/course/changeState`,
        // })
        //     .then((res) => {})
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    const handleDeleteCreatedClass = (id) => {
        setCreatedClassData((prevClassData) =>
            prevClassData.filter((data) => data.id !== id)
        );
        // axios({
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     data: JSON.stringify({
        //         classID: id,
        //     }),
        //     withCredentials: true,
        //     url: `${process.env.REACT_APP_API_URL}/course/deleteClass`,
        // })
        //     .then((res) => {})
        //     .catch((error) => {
        //         console.error(error);
        //     });
        // axios({
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     data: JSON.stringify({
        //         classID: id,
        //     }),
        //     withCredentials: true,
        //     url: `${process.env.REACT_APP_API_URL}/course/deleteClassFromUser`,
        // })
        //     .then((res) => {})
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    const value = {
        curIndex,
        setCurIndex,
        handleChangeIndex,
        joinedClassData,
        handleNewJoinedClass,
        handleDeleteJoinedClass,
        checkJoinedClassIDExist,
        createdClassData,
        handleNewCreatedClass,
        handleChangeCreatedClassState,
        handleDeleteCreatedClass,
    };
    return (
        <ClassDataContext.Provider value={value}>
            {children}
        </ClassDataContext.Provider>
    );
};
