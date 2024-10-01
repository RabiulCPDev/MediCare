import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-black.png';
import User from '../userSettings/User';

export const NavBar = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 w-full h-20">
                <div className="flex gap-2 items-center justify-between">
                    <div className="mx-5 w-40 flex gap-2 items-center">
                        <img src={logo} alt="Logo" className="w-40 h-20 mx-2 border rounded-full" />
                        <div className="inline-block whitespace-nowrap">
                            <p className="text-2xl text-white font-semibold">Healthy Life</p>
                        </div>
                    </div>

                    <div className="flex gap-1 text-white mr-3">
                        <Link to="/">
                            <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Home
                            </p>
                        </Link>

                        <Link to="/doctors">
                            <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Doctors
                            </p>
                        </Link>

                        <Link to="/services">
                            <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Services
                            </p>
                        </Link>

                        <Link to="/departments">
                            <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Departments
                            </p>
                        </Link>

                        <Link to="/about">
                            <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                About
                            </p>
                        </Link>

                        <Link to="/contacts">
                            <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                Contacts
                            </p>
                        </Link>

                        {token ? (
                            <User />
                        ) : (
                          <> 
                             <Link to="/register">
                            <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                SignUp
                            </p>
                            </Link>

                           <Link to="/login">
                                <p className="p-2 mx-1 text-2xl border border-transparent hover:bg-gray-400 hover:border hover:rounded-lg">
                                    LogIn
                                </p>
                            </Link>
                           
                        </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
