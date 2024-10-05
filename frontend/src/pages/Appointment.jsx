import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export const Appoinment=()=>{

    const location = useLocation();
    const {doctor} = location.state;
    const navigate = useNavigate();
    const [user,setUser]=useState(null);
    
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

   const HandleClicked =async()=>{
        const res=await axios.post('http://localhost:5000/api/payment',{
            doctor_id: doctor.id,
            customer_id:user.id,
            fee:doctor.consultation_fee
        });

        cosole.log(res.data.url);
   }


    return(
        <div className="bg-gray-900 shadow-lg  justify-center"> 
            <div className="">
                <h1 className=" text-center text-4xl py-6  text-white">Appoinment Schedule</h1>
            </div>

            <div className="flex flex-col justify-center items-center mt-6">
               <table className="min-w-min border m-4 p-4 text-white mt-4">
                    <thead>
                        <tr className="bg-gray-400">
                            <th className="py-2 px-4 border  text-white text-2xl text-center">Name</th>
                            <th className="py-2 px-4 border  text-white text-2xl text-center">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border  text-white text-2xl text-center">Doctor Name</td>
                            <td className="py-2 px-4 border  text-white text-2xl text-center">{doctor.fname} {doctor.lname}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border  text-white text-2xl text-center">Patient Name</td>
                            
                            {user &&  <td className="py-2 px-4 border  text-white text-2xl text-center">{user.fname} {user.lname}</td> }
                        </tr>

                        <tr>
                            <td className="py-2 px-4 border  text-white text-2xl text-center">Doctor's Room No:</td>
                            <td className="py-2 px-4 border  text-white text-2xl text-center">{doctor.room_number}</td>

                        </tr>
                        <tr>
                            <td className="py-2 px-4 border  text-white text-2xl text-center">Appoinment Date & Time</td>
                            <td className="py-2 px-4 border  text-white text-2xl text-center">{Date.now()}</td>
                        </tr>
                        <tr className="">
                        <td className="py-2 px-4 border  text-white text-2xl text-center">Consultation Fee</td>

                            <td className="py-2 px-4 border  text-white text-2xl text-center">{doctor.consultation_fee}</td>

                        </tr>
                    </tbody>
               </table>
               <div>
                    <button type="submit" onClick={HandleClicked} className="text-xl text-white rounded-lg bg-blue-500 text-center m-4 p-2">Payment to Confirm</button>
               </div>
            </div>
        </div>
    )
}