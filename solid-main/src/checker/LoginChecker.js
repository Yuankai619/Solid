import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginChecker = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:4000/auth/auth-state',
                    withCredentials: true
                });

                if (response.data.loginState === "LoginFailed") {
                    navigate('/login');
                    setIsLoggedIn(false);
                } else if (response.data.completeCreateState === 'UnFinishCompleteCreate') {
                    navigate('/updateinfo');
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(true); // Assuming login is successful
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            }
        };
        fetchUserData();
    }, [navigate]);

    return isLoggedIn;
};

export default LoginChecker;
