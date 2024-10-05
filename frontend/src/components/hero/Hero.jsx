
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { faUserDoctor ,faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export const Hero = () => {
  return (
    <>
      <div className="relative w-full h-[85vh] bg-hero bg-cover bg-center flex flex-col items-center justify-center">
        <div className="relative z-20 text-center bg-slate-900 bg-opacity-50 p-4 rounded-lg">
          <h1 className="text-white text-4xl font-bold mb-4">
            Exceptional Care for Your Health and Well-being
          </h1>
          <h1 className="text-center text-2xl  text-white mb-6">
            Providing top-notch medical services with compassionate care.
          </h1>
        </div>
        <div className=" z-1 top-40 inset-x-0 bg-slate-500 opacity-50 absolute"></div>

        <div className=" flex justify-center gap-4 mt-8 relative z-20">
        <Link to={'/doctors'} >
          <p
            className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition  "
          >
            Make an Appointment
          </p>
          </Link> 
          <Link to={'/about'} >
          <p
            
            className="bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Learn More
          </p>
          </Link> 
        </div>



       
        
      </div>

      <div className="m-1 flex  justify-center ">
         <Link to={'/hotline'} >
             <p
                className="flex items-center m-4 text-3xl bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
              >
                 <EmergencyRecordingIcon style={{fontSize: 50}}/>
                 <span className='m-2'>
                   24x7 Hotline  
                  </span>
              </p>
              </Link> 
              {/* <a
                href="#learn-more"
                className="m-4 items-center text-3xl bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition"
              >
                <MedicalServicesIcon style={{fontSize: 50}} />
               
                24x7 Emergency
              </a> */}
              <Link to={'/ambulance'}>
              <p
                 className="flex items-center m-4 text-3xl bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faTruckMedical} style={{fontSize:40, margin:4}}/>
                <span className='m-2'>
                 24/7 Ambulance
                   </span>
              </p>
              </Link>
             
              <Link to={'/doctors'}>  
              <p
                 className="flex items-center m-4 text-3xl bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
              >
             <FontAwesomeIcon icon={faUserDoctor} style={{fontSize:40, margin:4}} />
             <span className='m-2'> 
                Specialists
               </span>
              </p>
              </Link>
             
              <Link to={'/about'}>
              <p
                  className="flex items-center m-4 text-3xl bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
              >
            <FontAwesomeIcon icon={faCircleInfo} style={{fontSize:40, margin:3}} />
             <span className='m-2'> 
                  Information
             </span>
              </p>
              </Link>
            </div>


    </>
  );
};
