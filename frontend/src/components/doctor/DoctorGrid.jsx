import { useEffect,useState } from "react";
import { DoctorCard } from "./DoctorCard"
import axios from "axios";

export const DoctorGrid = ()=>{
    const [doctor,setDoctor]= useState([]);
 

    const Doctors =async()=>{
        try{
            const response= await axios.get('http://localhost:5000/api/doctors') ;
            setDoctor(response.data);
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(()=>{
        Doctors();
    },[]);

    return (
            <div className=" gap-2 grid grid-cols-4 px-14 my-3 justify-center ">   
                { doctor && doctor.length>0 ?(
                    doctor.map((doc,index)=>(
                        <DoctorCard key={index} doctor={doc}/>
                    ))
                 ):(
                    <h1 className="text-center">Doctor not found</h1>
                 )   
                }
            </div>
    )
}