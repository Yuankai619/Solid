import React, { useState } from "react";
import Container from '@mui/material/Container';
import CreateClassCard from "./CreateClassCard";

function CreateClassContainer() {
  
  const [classData, setClassData] = useState([
    { id: 1, discussionName: "Card1", classID: "001", state: "close" },
    { id: 2, discussionName: "Card2", classID: "002", state: "open" },
    { id: 3, discussionName: "Card3", classID: "003", state: "close" },
  ]);


  // useEffect(() => { 
  //   const fetchUserData = async () => { 
  //     try { 
  //       const response = await axios.get('url')
  //         .then(res => {
  //           console.log(res.data);
  //           const formattedData = res.data.map(item => ({
  //             // 重新格式化数据
  //           }));
  //           setClassData(formattedData);
  //         })
  //         .catch(error => {
  //           console.error('Error fetching data:', error);
  //           // 處理錯誤
  //         });
  //     } catch (error) { 
  //       console.error('Error fetching user data:', error); 
  //       // 處理錯誤
  //     } 
  //   };
  //   fetchUserData();  
  // }, []); 
  // const handleDelete = (id) => {
  //   axios.delete(`/api/components-data/${id}`) // 替换为您的 API 端点
  //     .then(() => {
  //       // 删除成功后，从状态中移除该组件
  //       setComponentData(prevData => prevData.filter(item => item.id !== id));
  //     })
  //     .catch(error => {
  //       console.error('Error deleting data:', error);
  //     });
  // };
  const handleUpdate = (id, newData) => {
    setClassData(prevData =>
      prevData.map(data => (data.id === id ? { ...data, ...newData } : data))
    );
  };
  const handleDelete = (id) => {
    setClassData(prevData =>
      prevData.filter(data => data.id !== id)
    );
  };
  return (
    <Container>
      {classData.map((data) => (
        <CreateClassCard
          key={data.id}
          data={data}
          onUpdate={(newData) => handleUpdate(data.id, newData)}
          onDelete={() => handleDelete(data.id)}
        />
      ))}
    </Container>
  );
}

export default CreateClassContainer;