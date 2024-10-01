import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot,faEnvelope,faPhoneVolume,faClock} from '@fortawesome/free-solid-svg-icons';
export const Contacts = ()=>{
    return (
        <div>
        <h1 className="text-4xl p-3 m-2 text-center">Contact Information</h1>
            <div className=" bg-gray-100 rounded-md shadow-lg grid grid-cols-1 md:grid-cols-2" >
           
                <div className="rounded-lg items-center shadow-lg bg-gray-300 flex  m-3 p-3">
                   
                    <div className="rounded-lg shadow-sm bg-gray-200 w-20 h-20 flex">
                        <div className='flex justify-center items-center w-full h-full'>
                            <FontAwesomeIcon fontSize="40px" icon={faLocationDot} />
                        </div>
                        
                    </div>
                    <div className ="m-2 p-2 items-center">
                        <p className=' text-2xl font-semibold'>Address:</p>
                        <p className=' text-xl'>Building no-2, 2nd Floor, New Market, Khulna</p>
                       
                    </div>
                </div>

                <div className=" items-center rounded-lg shadow-lg bg-gray-300 flex  m-3 p-3">

                    <div className="rounded-lg shadow-sm bg-gray-200 w-20 h-20 flex">
                        <div className='flex justify-center items-center w-full h-full'>
                        <FontAwesomeIcon fontSize="40px" icon={faEnvelope} />
                        </div>
                        
                    </div>
                    <div className ="m-3 p-3">
                        <p className=' text-2xl font-semibold'>Email:</p>
                        <p className=' text-xl'>abcdefgh@gmail.com</p>
                       
                    </div>
                </div>
                <div className="items-center rounded-lg shadow-lg bg-gray-300 flex  m-3 p-3">

                    <div className="rounded-lg shadow-sm bg-gray-200 w-20 h-20 flex">
                        <div className='flex justify-center items-center w-full h-full'>
                        <FontAwesomeIcon fontSize="40px" icon={faPhoneVolume} />
                        </div>
                        
                    </div>
                    <div className ="m-3 p-3">
                        <p className=' text-2xl font-semibold'>Phone:</p>
                        <p className=' text-xl'>01608077190</p>
                       
                    </div>
                </div>

                <div className=" items-center rounded-lg shadow-lg bg-gray-300 flex  m-3 p-3">

                    <div className="rounded-lg shadow-sm bg-gray-200 w-20 h-20 flex">
                        <div className='flex justify-center items-center w-full h-full'>
                        <FontAwesomeIcon fontSize="40px" icon={faClock} />
                        </div>
                        
                    </div>
                    <div className ="m-3 p-3">
                        <p className=' text-2xl font-semibold'>Operating Hours:</p>
                        <p className=' text-xl'>24Hours/7Days</p>
                       
                    </div>
                </div>
                
            </div>
        </div>
    )
}