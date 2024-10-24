import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo-black.png';
import User from '../userSettings/User';

export const NavBar = ({ setIsMenuOpenInHero }) => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

  
    useEffect(() => {
        setIsMenuOpenInHero(isMenuOpen);
    }, [isMenuOpen, setIsMenuOpenInHero]);

  
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 w-full h-20 relative z-20">
            <div className="flex items-center justify-between h-full px-4">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-32 h-20 mx-2 border rounded-full" />
                    <p className="text-2xl text-white font-semibold">Healthy Life</p>
                </div>

                {/* Menu Icon for Mobile */}
                <div className="block lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-3xl">
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className={`lg:flex gap-1 text-white mr-3 transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex flex-col items-center absolute top-20 left-0 w-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 z-10' : 'hidden lg:flex'}`}>
                    <Link to="/" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                        Home
                    </Link>
                    <Link to="/doctors" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                        Doctors
                    </Link>
                    <Link to="/services" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                        Services
                    </Link>
                    <Link to="/departments" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                        Departments
                    </Link>
                    <Link to="/about" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                        About
                    </Link>
                    <Link to="/contacts" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                        Contacts
                    </Link>
                    {token ? (
                        <User />
                    ) : (
                        <>
                            <Link to="/register" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                                SignUp
                            </Link>
                            <Link to="/login" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg" onClick={closeMenu}>
                                LogIn
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
