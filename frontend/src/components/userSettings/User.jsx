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
    }, [navigate,user]);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/data', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data.user.user_url);
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/');
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
        setDropdownOpen(false);
        navigate(`/UserSettings/${user._id}`, { state: { user } });
    };

    const handleAccountClick = () => {
        setDropdownOpen(false);
        navigate(`/account/${user._id}`, { state: { user } });
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
    }, [isDropdownOpen,navigate]);

    return (
        <div className="profile-dropdown">
             <div>
                {user ? (
                 
                        <img
                        src={user.user_url || 'https://via.placeholder.com/150'}
                        alt={`${user.fname} ${user.lname}`}
                        className="w-12 h-12 rounded-full cursor-pointer"
                        onClick={handleProfileClick}
                    />
                   
                ) : (
                    <img
                        src='https://via.placeholder.com/150'
                        alt="Default User"
                        className="w-12 h-12 rounded-full cursor-pointer"
                        onClick={handleProfileClick}
                    />
                )}
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
}    

export default User;
