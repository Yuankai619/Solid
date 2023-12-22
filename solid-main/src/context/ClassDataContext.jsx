// ClassDataContext.js
import React, { createContext, useState, useContext } from 'react';

const ClassDataContext = createContext();
export const useClassDataContext = () => useContext(ClassDataContext);

export const ClassDataProvider = ({ children }) => {
    const [createdClassData, setCreatedClassData] = useState([
        { id: 1, title: "Card1", classID: "001", state: "close" },
        // { id: 2, discussionName: "Card2", classID: "002", state: "open" },
        // { id: 3, discussionName: "Card3", classID: "003", state: "close" },
    ]);
    //fetch class data
    // useEffect(() => {
    //     const fetchClassData = async () => {
    //         try {
    //             const response = await axios.get(''); // 更換為你的 API 端點
    //             setClassData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching class data:', error);
    //         }
    //     };

    //     fetchClassData();
    // }, []);
    //
    const handleNewCreatedClass = newClass => {
        setCreatedClassData(prev => [...prev, newClass]);
    };
    const handleChangeCreatedClassState = (id, newState) => {
        setCreatedClassData(prevClassData =>
            prevClassData.map(data =>
                data.id === id ? { ...data, state: newState } : data
            )
        );
    };
    const handleDeleteCreatedClass = id => {
        setCreatedClassData(prevClassData =>
            prevClassData.filter(data => data.id !== id)
        );
    };
    return (
        <ClassDataContext.Provider value={{ createdClassData, handleNewCreatedClass,handleChangeCreatedClassState,handleDeleteCreatedClass }}>
            {children}
        </ClassDataContext.Provider>
    );
};
