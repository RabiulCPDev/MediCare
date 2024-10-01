 import {  useNavigate } from 'react-router-dom';
 export const DoctorCard = ({doctor})=>{
        
    const navigate= useNavigate();
    
    const HandleAppoinment =()=>{
        navigate(`/appoinment/${doctor._id}`,{state:{doctor}});
    }
    const HandleDocPro =()=>{
       
        navigate(`/doctor/${doctor._id}`,{state:{doctor}});
    }
    
    return(
            <div>

            <div className="max-w-3xl flex flex-col items-center justify-center mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <div className=" h-40 w-40 rounded-full shadow-xl">
                    <img src={doctor.url} alt="not found" className="rounded-full shadow-xl"/>
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-xl font-semibold text-center">{doctor.fname} {doctor.lname}</span>
                    <div className="flex flex-wrap justify-center">
                    {
                        doctor.qualifications.map((q,i)=>(
                            <span className="text-xl  mx-1" key={i}>{q} </span>
                        ))
                    }
                    </div>
                    <h1 className="text-xl text-center">{doctor.specialization} Specialist</h1>
                    {/* <h1 className="text-xl text-center">{doctor.years_of_experience} Years experienced</h1> */}
                    
                    <h1 className="text-xl text-center">Consultation fee:  {doctor. consultation_fee} taka</h1>

                    <div className="flex justify-between p-1">
                        <button type='submit' onClick={HandleAppoinment} className="p-2 hover:animate-shake bg-blue-600 m-1 rounded-lg transform">Appoinment</button>
                        <button type='submit' onClick={HandleDocPro} className="p-2 hover:animate-shake bg-blue-600 m-1 rounded-lg transformz">See Profile</button>
                    </div>


                </div>
            </div>

            </div>
        )
}