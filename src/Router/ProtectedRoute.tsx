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
                const response = await axios.get(`${api}/auth/profile`, {
                    headers: {
                        Authorization: token
                    }
                });
                const { data } = response;
                setProfileData(data);

                // Check role and redirect accordingly
                if (data.role === 'admin' && !location.pathname.startsWith('/member')) {
                    navigate('/admin');
                }
                 else if (data.role === 'user' && location.pathname.startsWith('/admin')) {
                    navigate('/member');
                }
            } catch (error: any) {
                if (error.response?.status === 401 || error.response?.status === 404) {
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

    return profileData ? <Outlet /> : null; // Render nothing while loading
};

export default ProtectedRoute;
