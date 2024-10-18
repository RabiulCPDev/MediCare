import { useState, useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import adminAvatar from '../../../assets/adminAvatar.avif'
export const Topbar = ({setActiveSection,role}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white p-4 shadow-md flex justify-between items-center relative z-50">
           <Link to={'/admin/dashboard'}
                        onClick={() => {
                                setIsDropdownOpen(false);
                                setActiveSection('default')
                            }}>
             <h1 className="text-2xl font-semibold">{role} Dashboard</h1>
           </Link>
            
            <div className="relative flex items-center" ref={dropdownRef}>
                <img
                    src={adminAvatar}
                    alt="Admin"
                    className="rounded-full w-10 h-10 cursor-pointer mr-5"
                    onClick={toggleDropdown}
                />
                {/* <span className="ml-2 cursor-pointer" onClick={toggleDropdown}>Admin</span> */}

                {isDropdownOpen && (
                    <div className="absolute right-0 top-12 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                        <div
                            className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                setActiveSection('adminAccount')
                            }}
                        >
                            Account Details
                        </div>
                        {/* <div
                            className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                setActiveSection('updateAdmin')
                            }}
                        >
                            Update Profile
                        </div> */}
                        <div className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                            <span onClick={() => {
                                sessionStorage.removeItem('adminToken');
                                alert('Logged out successfully.');
                                window.location.href = '/admin';
                            }}>Logout</span>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
