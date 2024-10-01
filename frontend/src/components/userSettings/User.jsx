import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchUserData(token);
        }
    }, [navigate]);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/data', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login'); 
    };

    const handleProfileClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSettingsClick = () => {

        navigate('/UserSettings', { state: { user } });
    };

    const handleAccountClick = () => {

        navigate('/account', { state: { user } });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-dropdown')) {
                setDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="relative profile-dropdown">
            <div>
                <img
                    src={user?.user_url || 'https://via.placeholder.com/150'}
                    alt={`${user?.fname} ${user?.lname}`}
                    className="w-14 h-14 rounded-full p-2 cursor-pointer"
                    onClick={handleProfileClick} 
                />
            </div>

            {isDropdownOpen && (
                <div className="absolute top-12 right-1 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                    <ul className="text-gray-700">
                        <li
                            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                            onClick={handleAccountClick}
                        >
                            Account
                        </li>
                        <li
                            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                            onClick={handleSettingsClick}
                        >
                            Settings
                        </li>
                        <li
                            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default User;
