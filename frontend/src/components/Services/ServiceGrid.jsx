import { useEffect, useState } from 'react';
import { ServiceCard } from './ServiceCard';
import axios from 'axios';
export const ServiceGrid = ()=>{
       
       const [services,setServices]=useState([]);
       useEffect(()=>{
                fetchServices();
       },[])

       const fetchServices=async()=>{
                try{
                        const res= await axios.get("http://localhost:5000/api/services");
                         setServices(res.data);
                }catch(err){
                        console.log('Problem while fetching Services');
                }   
        
       }

        return (
                <div className=" gap-2 grid grid-cols-3 px-14 my-4 justify-center ">

                    { services.length>0 ?
                        services.map((service,index)=>(
                             <ServiceCard key={index} services={service}/>
                        )):(
                                <h1 className='text-center text-2xl'>No Service Available</h1>
                        )
                    }   
                  

                </div>
        )
}