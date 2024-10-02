import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { ServiceGrid } from "../components/Services/ServiceGrid";
import { Hero } from "../components/hero/Hero";
import  FileUpload  from '../components/fileUpload/FileUpload'
import {Footer} from '../components/footer/Footer';
import { DepartmentGrid } from "../components/department/DepartmentGrid";
import { DoctorGrid } from "../components/doctor/DoctorGrid";
export const HomePage = () => {
  const location = useLocation();
  return (
    <div className="App ">
      <NavBar />

      {location.pathname === "/" ? (
        <>
             <Hero />
             <div>
          <h1 className=" text-center text-4xl font-semibold text-blue-500 ">
            Our Services
          </h1>
          <div className=" bg-purple-50 ">
            <ServiceGrid />
          </div>

          <h1 className=" text-center text-4xl font-semibold text-blue-500 ">
            Our Departments
          </h1>
          <div className=" bg-purple-50 ">
            <DepartmentGrid />
          </div>

          <h1 className=" text-center text-4xl font-semibold text-blue-500 ">
            Our Specialists
          </h1>
          <div className=" bg-purple-50 ">
            <DoctorGrid />
          </div>


        </div>
        </>
        
      ):(
        <Outlet/>
      )}

      <div className=" bg-black h-40 w-full">
       <Footer/>
      </div>
    </div>
  );
};
