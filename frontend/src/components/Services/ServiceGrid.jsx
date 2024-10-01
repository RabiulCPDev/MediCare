import { ServiceCard } from "./ServiceCard"
export const ServiceGrid = ()=>{
        return (
                <div  className="flex justify-center m-2">
                       
                    <div className=" shadow-lg rounded-md gap-10 grid grid-cols-3 px-14 m-3" >
                        
                        <ServiceCard/>
                        <ServiceCard/>
                        <ServiceCard/>
                        <ServiceCard/>
                        <ServiceCard/>
                        <ServiceCard/>
                        <ServiceCard/>
                        <ServiceCard/>

                    </div>
                </div>
        )
}