import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState for managing menu state
import logo from '../../assets/logo-black.png';
import User from '../userSettings/User';

export const NavBar = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    // Toggle function for the hamburger menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 w-full h-20">
            <div className="flex flex-col sm:flex-row items-center justify-between h-full px-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center w-full sm:w-auto">
                        <img src={logo} alt="Logo" className="w-32 h-20 mx-2 border rounded-full" />
                        <div className="inline-block whitespace-nowrap">
                            <p className="text-2xl text-white font-semibold">Healthy Life</p>
                        </div>
                    </div>
                    {/* Hamburger Icon for Mobile */}
                    <div className="sm:hidden">
                        <button
                            className="text-white focus:outline-none"
                            onClick={toggleMenu} // Call toggleMenu on click
                            aria-label="Toggle Menu"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className={`hidden sm:flex gap-1 text-white mr-3`}>
                    <Link to="/">
                        <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                            Home
                        </p>
                    </Link>
                    <Link to="/doctors">
                        <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                            Doctors
                        </p>
                    </Link>
                    <Link to="/services">
                        <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                            Services
                        </p>
                    </Link>
                    <Link to="/departments">
                        <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                            Departments
                        </p>
                    </Link>
                    <Link to="/about">
                        <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                            About
                        </p>
                    </Link>
                    <Link to="/contacts">
                        <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                            Contacts
                        </p>
                    </Link>
                    {token ? (
                        <User />
                    ) : (
                        <>
                            <Link to="/register">
                                <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                    SignUp
                                </p>
                            </Link>
                            <Link to="/login">
                                <p className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                    LogIn
                                </p>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden flex flex-col items-center bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
                    <div className="flex flex-col items-center text-white">
                        <Link to="/" onClick={toggleMenu}>
                            <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Home
                            </p>
                        </Link>
                        <Link to="/doctors" onClick={toggleMenu}>
                            <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Doctors
                            </p>
                        </Link>
                        <Link to="/services" onClick={toggleMenu}>
                            <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Services
                            </p>
                        </Link>
                        <Link to="/departments" onClick={toggleMenu}>
                            <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Departments
                            </p>
                        </Link>
                        <Link to="/about" onClick={toggleMenu}>
                            <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                About
                            </p>
                        </Link>
                        <Link to="/contacts" onClick={toggleMenu}>
                            <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Contacts
                            </p>
                        </Link>
                        {token ? (
                            <User />
                        ) : (
                            <>
                                <Link to="/register" onClick={toggleMenu}>
                                    <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                        SignUp
                                    </p>
                                </Link>
                                <Link to="/login" onClick={toggleMenu}>
                                    <p className="p-2 mx-1 text-lg border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                        LogIn
                                    </p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
