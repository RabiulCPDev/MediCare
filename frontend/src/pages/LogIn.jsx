import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export const LogIn = () => {

  const navigate = useNavigate();



  const [fData, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [message, setMessage] = useState('');
  const ChangeHandle = (e) => {
    const { id, value } = e.target;
    setData({ ...fData, [id]: value });
  };

  const HandleClick = async(event) => {
    event.preventDefault();
    console.log("Clicked"+fData.email+" "+fData.password);
    const validation = ValidateData();
    if (Object.keys(validation).length !== 0) {
      setError(validation);
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
            email:fData.email,
            password:fData.password,
        });

        if (response.status === 200) {
            setMessage('Login Successful!');
            sessionStorage.setItem('token', response.data.token);
            console.log(response.data);
            navigate('/');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            setMessage('Invalid Credentials');
        } else {
            setMessage('Internal Server Error');
        }
    }
  };
}

  const ValidateData = () => {
    const errorS = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   if (!fData.email) {
      errorS.email = "Please Enter a valid email";
    } else if (!emailRegex.test(fData.email)) {
      errorS.email = "Please Enter a valid email";
    }
    return errorS;
  };

  return (
    <div className="">
      <div className=" flex flex-col bg-gradient-to-tl from-blue-400 to-purple-400 mt-auto  items-center justify-center">
        <div className="bg-white max-w-md w-full rounded-lg p-8 shadow-lg ">
         <h1 className="text-center text-2xl font-semibold">Welcome To Healthy Life</h1>
          <form id="registrationForm">
            <label htmlFor="email" className="m-2 text-xl block text-gray-700">
            Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={fData.email}
              onChange={ChangeHandle}
              className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus: outline-none focus:ring-blue-200"
            />
            {error.email && (
              <p className=" text-sm text-red-600 mt-1 p-1">{error.email}</p>
            )}
        
              <div className=" mt-1">
                <label
                  htmlFor="password1"
                  className="m-2 text-xl block text-gray-700"
                >
                  Enter Your Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={fData.password}
                  onChange={ChangeHandle}
                  placeholder="Password"
                  className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus: outline-none focus:ring-blue-200"
                />
            </div>

            <div className="mt-3">
              <button
                type="submit"
                onClick={HandleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                LogIn
              </button>
              {message && <p>{message}</p>}
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
