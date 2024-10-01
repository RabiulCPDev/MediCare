import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export const Register = () => {

const navigate =useNavigate();

  const [fData, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone:"",
    age:"",
    gender:"",
    medical_description:"",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState({});

  const ChangeHandle = (e) => {
    const { id, value } = e.target;
    setData({ ...fData, [id]: value });
  };

  const HandleClick = async(event) => {
    event.preventDefault();

    const validation = ValidateData();
    if (Object.keys(validation).length !== 0) {
      setError(validation);
    } else {
      console.log("Valid Data Submitted");
     try{
      const response = await axios.post('http://localhost:5000/api/user/register', {
        fname:fData.fname,
        lname:fData.lname,
        email:fData.email,
        phone:fData.phone,
        age:fData.age,
        medical_description:fData.medical_description,
        gender:fData.gender,
        password:fData.password1,
      });
      if(response.status===200){
        console.log("user registered");
        navigate('/');
    }
 }catch(error){
        if (error.response && error.response.status === 409) { 
          setError({ email: "You have already an account with this email" });
        } else {
          console.log(error);
        }
      }
    }
  };

  const ValidateData = () => {
    const errorS = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!fData.fname) {
      errorS.fname = "Please Enter your first name";
    } else if (!fData.email) {
      errorS.email = "Please Enter a valid email";
    }else if (!fData.age) {
      errorS.age = "Please Enter a your age";
    }else if (!fData.phone) {
      errorS.phone = "Please Enter a unique phone number";
    }else if (!fData.gender) {
      errorS.gender = "Please select your gender";
    }else if (!emailRegex.test(fData.email)) {
      errorS.email = "Please Enter a valid email";
    } else if (!fData.password1) {
      errorS.password1 = "Please Enter a valid password";
    } else if (fData.password1 !== fData.password2) {
      errorS.password2 = "Password not matched";
    }
    return errorS;
  };

  return (
    <div className="">
      <div className=" flex flex-col bg-gradient-to-tl from-blue-400 to-purple-400 mt-auto  items-center justify-center">
        <div className="bg-white max-w-md w-full rounded-lg p-8 shadow-lg ">
          
        <h1 className="text-center text-2xl font-semibold">Welcome To Healthy Life</h1>
         <h2 className="text-xl text-center font-semibold">Create an Account</h2>
          <form id="registrationForm">
            <div className=" flex justify-center ">
              <div className="mt-1">
                <label
                  htmlFor="fname"
                  className="m-2 text-xl block text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  placeholder="First Name"
                  value={fData.fname}
                  onChange={ChangeHandle}
                  className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus: outline-none focus:shadow-outline focus:ring-blue-200"
                />
                {error.fname && (
                  <p className=" text-sm text-red-600 mt-1 p-1">
                    {error.fname}
                  </p>
                )}
              </div>
              <div className="mt-1 mx-1">
                <label
                  htmlFor="lname"
                  className="m-2 text-xl block text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  value={fData.lname}
                  onChange={ChangeHandle}
                  placeholder="Last Name"
                  className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus: outline-none focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div  className="mt-1">
              <label htmlFor="email" className="m-2 text-xl block text-gray-700">
              Email
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
              </div>

              <div className="mt-1 mx-1">
              <label htmlFor="phone" className="m-2 text-xl block text-gray-700">
             Phone Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Phone Number"
              value={fData.phone}
              onChange={ChangeHandle}
              className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus: outline-none focus:ring-blue-200"
            />
              {error.phone && (
                <p className=" text-sm text-red-600 mt-1 p-1">{error.phone}</p>
              )}
              </div>

            </div>


            <div className="flex justify-center ">
              <div className="mt-1 w-1/2">
                <label htmlFor="age" className="m-2 text-xl block text-gray-700">
                  Age
                </label>
              <input
                type="text"
                id="age"
                placeholder="Age"
                value={fData.age}
                onChange={ChangeHandle}
                className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-200"
              />
               {error.age && (
                  <p className="text-sm text-red-600 mt-1 p-1">{error.age}</p>
                )}
            </div>

            <div className="mt-1 mx-1 w-1/2 ">
              <label htmlFor="gender" className="m-2  text-xl block text-gray-700">
                Gender
              </label>
          <div className="flex items-center justify-center w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-200">
            <label className="mr-3">
              <input
                type="radio"
                id="gender"
                value="Male"
                checked={fData.gender === "Male"}
                onChange={ChangeHandle}
                className="mr-1"
              />
              Male
            </label>
            <label className="mr-2">
              <input
                type="radio"
                id="gender"
                value="Female"
                checked={fData.gender === "Female"}
                onChange={ChangeHandle}
                className="mr-1"
              />
              Female
            </label>
          </div>
          {error.gender && (
            <p className="text-sm text-red-600 mt-1 p-1">{error.gender}</p>
          )}

          </div>
          </div>
          <div className="mt-1">
            <label
              htmlFor="medical_description"
              className="m-2 text-xl block text-gray-700"
            >
              Previous Medical Description (Optional)
            </label>
            <textarea
              id="medical_description"
              value={fData.medical_description}
              onChange={ChangeHandle}
              placeholder="Provide any previous medical information"
              className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-200"
              rows="1"
            ></textarea>
          </div>

            <div className="flex justify-center ">
              <div className=" mt-1">
                <label
                  htmlFor="password1"
                  className="m-2 text-xl block text-gray-700"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  id="password1"
                  value={fData.password1}
                  onChange={ChangeHandle}
                  placeholder="Password"
                  className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus: outline-none focus:ring-blue-200"
                />
                {error.password1 && (
                  <p className="text-sm text-red-600 mt-1 p-1">
                    {error.password1}
                  </p>
                )}
              </div>

              <div className=" mt-1 mx-1 ">
                <label
                  htmlFor="password2"
                  className="m-2 text-xl block text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password2"
                  value={fData.password2}
                  onChange={ChangeHandle}
                  placeholder="Password"
                  className="w-full p-2 bg-gray-200 rounded-md focus:ring-2 focus: outline-none focus:ring-blue-200"
                />
                {error.password2 && (
                  <p className="text-sm text-red-600 mt-1 p-1">
                    {error.password2}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <button
                type="submit"
                onClick={HandleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Create Account
              </button>
              
            </div>
          </form>
         
        </div>
        <Link to={'/login'}>
              <p className="text-sm mt-1 p-1">
                Already have account ?</p>
                <u
                  className= "hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                LogIn
              </u>
             </Link>
      </div>
     
    </div>
  );
};
