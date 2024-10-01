import { useEffect, useState } from 'react';
import { DepartmentCard } from './DepartmentCard';
import axios from 'axios';
export const DepartmentGrid = ()=>{
       
       const [departments,setDepartment]=useState([]);
       useEffect(()=>{
                fetchDepartment();
       },[])

       const fetchDepartment=async()=>{
                try{
                        const res= await axios.get("http://localhost:5000/api/departments");
                        console.log(res.data)
                        setDepartment(res.data);
                }catch(err){
                        console.log('Problem while fetching departments');
                }   
        
       }

        return (
                <div className=" gap-2 grid grid-cols-3 px-14 my-4 justify-center ">

                    { departments.length>0 ?
                        departments.map((dep,index)=>(
                             <DepartmentCard key={index} departments={dep}/>
                        )):(
                                <h1 className='text-center text-2xl'>No Departments Available</h1>
                        )
                    }   
                  

                </div>
        )
}