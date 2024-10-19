import {ServiceGrid} from '../components/Services/ServiceGrid';

export const Services = ()=>{
    return (
        <div>
            <div className="bg-gray-100 shadow-lg">
               
                <div className="mt-1">
                    <h1 className="text-4xl text-gray-900 font-semibold text-center">Our Services</h1>
                </div>

                <div className='md:m-8'>
                     <ServiceGrid/>
                </div>

            </div>
            
        </div>
    )
}