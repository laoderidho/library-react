import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { api } from '../config/api';

const ProtectedRoute = () => {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api}/profile`, {
                    headers: {
                        Authorization: token
                    }
                });
                setProfileData(response.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/login', { state: { from: location.pathname } });
                } else if (axios.isAxiosError(error) && error.response?.status === 404) {
                    console.log(error.response.status);
                    navigate('/login', { state: { from: location.pathname } });
                } else {
                    console.error(error);
                }
            }
        };

        if (token) {
            fetchData();
        } else {
            navigate('/login');
        }
    }, [token, navigate, location.pathname]);

    return <Outlet />;
};

export default ProtectedRoute;