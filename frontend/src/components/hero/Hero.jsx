import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMedical, faUserDoctor, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Hero = ({ isMenuOpen }) => {
  return (
    <>
      {/* Hero Section */}
      <div
        className={`relative w-full h-[330px] sm:h-screen bg-hero bg-cover bg-center flex flex-col items-center justify-center transition-all duration-300 ${
          isMenuOpen ? 'mt-16' : 'mt-0'
        }`}
      >
        <div className={`relative z-10 text-center bg-slate-900 bg-opacity-50 p-4 rounded-lg ${isMenuOpen ? 'mt-20' : ''}`}>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Exceptional Care for Your Health and Well-being
          </h1>
          {!isMenuOpen && (
            <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-6">
              Providing top-notch medical services with compassionate care.
            </h2>
          )}
        </div>

        {/* Buttons for Appointment and Learn More */}
        <div
          className={`flex justify-center gap-4 relative z-10 flex-wrap transition-all duration-300 ${
            isMenuOpen ? 'mt-24' : 'mt-8'
          }`}
        >
          <Link to={'/doctors'}>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
              Make an Appointment
            </button>
          </Link>
          <Link to={'/about'}>
            <button className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <Link to={'/hotline'}>
          <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105">
            <EmergencyRecordingIcon style={{ fontSize: 36 }} />
            <span>24x7 Hotline</span>
          </div>
        </Link>

        <Link to={'/ambulance'}>
          <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105">
            <FontAwesomeIcon icon={faTruckMedical} style={{ fontSize: 36 }} />
            <span>24/7 Ambulance</span>
          </div>
        </Link>

        <Link to={'/doctors'}>
          <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105">
            <FontAwesomeIcon icon={faUserDoctor} style={{ fontSize: 36 }} />
            <span>Specialists</span>
          </div>
        </Link>

        <Link to={'/about'}>
          <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105">
            <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: 36 }} />
            <span>Information</span>
          </div>
        </Link>
      </div>
    </>
  );
};
