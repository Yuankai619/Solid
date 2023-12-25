// // import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginChecker = async() => {
//     const navigate = useNavigate();
//     // const [isLoggedIn, setIsLoggedIn] = useState(false);

//     // useEffect(() => {
//     const fetchUserData = async () => {
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: `${process.env.REACT_APP_API_URL}/auth/auth-state`,
//                 withCredentials: true
//             });

//             if (response.data.loginState === "LoginFailed") {
//                 navigate('/login');
//                 // setIsLoggedIn(false);
//             } else if (response.data.completeCreateState === 'UnFinishCompleteCreate') {
//                 navigate('/updateinfo');
//                 // setIsLoggedIn(true);
//             }
//             // else {
//             //     setIsLoggedIn(true); // Assuming login is successful
//             // }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             // setIsLoggedIn(false);
//         }
//     };
//     fetchUserData();
//     // }, [navigate]);

//     // return isLoggedIn;
// };

// export default LoginChecker;


// LoginChecker.js
import axios from 'axios';

const loginChecker = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/auth/auth-state`,
            withCredentials: true
        });

        if (response.data.loginState === "LoginFailed") {
            return { isLoggedIn: false, redirectTo: '/login' };
        } else if (response.data.completeCreateState === 'UnFinishCompleteCreate') {
            return { isLoggedIn: true, redirectTo: '/updateinfo' };
        } else {
            return { isLoggedIn: true, redirectTo: null }; // Assuming login is successful
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { isLoggedIn: false, redirectTo: null };
    }
};

export default loginChecker;


