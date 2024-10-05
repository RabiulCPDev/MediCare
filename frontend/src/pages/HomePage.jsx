import { Link, Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { ServiceGrid } from "../components/Services/ServiceGrid";
import { Hero } from "../components/hero/Hero";
import { Footer } from '../components/footer/Footer';
import { DepartmentGrid } from "../components/department/DepartmentGrid";
import { DoctorGrid } from "../components/doctor/DoctorGrid";

export const HomePage = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen"> 
      <NavBar />

      <div className="flex-grow"> 
        {location.pathname === "/" ? (
          <>
            <Hero />
            <div>
              <h1 className="text-center text-4xl font-semibold text-blue-500">
                Our Services
              </h1>
              <div className="bg-purple-50">
                <ServiceGrid />
              </div>

              <div className="flex justify-between m-8 p-1">
                  <h1 className="text-left text-4xl font-semibold text-blue-500">
                      Our Departments
                  </h1>
                  <h1 className="text-right text-4xl font-semibold text-blue-900">
                      <Link to={'/doctors'}>
                          See All Departments
                      </Link>
                  </h1>
              </div>
              <div className="bg-purple-50 mb-4">
                <DepartmentGrid rowsToShow={'seeAll'} />
              </div>
              <div className="flex justify-between m-8 p-1">
                  <h1 className="text-left text-4xl font-semibold text-blue-500">
                      Our Specialists
                  </h1>
                  <h1 className="text-right text-4xl font-semibold text-blue-900">
                      <Link to={'/doctors'}>
                          See All Specialists
                      </Link>
                  </h1>
              </div>

              
              <div className="bg-purple-50">
                <DoctorGrid />
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
};
