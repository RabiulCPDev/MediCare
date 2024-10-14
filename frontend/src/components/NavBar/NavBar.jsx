import { Link, useNavigate } from 'react-router-dom';
import { useEffect} from 'react'; 
import logo from '../../assets/logo-black.png';
import User from '../userSettings/User';


export const NavBar = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 w-full h-20">
            <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-32 h-20 mx-2 border rounded-full" />
                    <p className="text-2xl text-white font-semibold">Healthy Life</p>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-1 text-white mr-3">
                    <Link to="/" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">Home</Link>
                    <Link to="/doctors" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">Doctors</Link>
                    <Link to="/services" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">Services</Link>
                    <Link to="/departments" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">Departments</Link>
                    <Link to="/about" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">About</Link>
                    <Link to="/contacts" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">Contacts</Link>
                    {token ? (
                            <User />
                    ) : (
                        <>
                            <Link to="/register" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">SignUp</Link>
                            <Link to="/login" className="p-2 mx-1 text-lg sm:text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">LogIn</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
