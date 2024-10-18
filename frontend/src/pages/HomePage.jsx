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
            <div className="mt-2 mx-4 sm:mx-8 lg:mx-16">
            <div className="flex flex-col sm:flex-row justify-between items-center my-6">
                  <h1 className="text-left text-3xl sm:text-4xl font-semibold text-blue-500">
                      Our Services
                  </h1>
                  <h1 className="text-right text-3xl sm:text-3xl font-semibold text-blue-900">
                      <Link to={'/services'}>
                          See All
                      </Link>
                  </h1>
              </div>
              <div className="bg-purple-50 mb-4">
                <ServiceGrid />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center my-6">
                  <h1 className="text-left text-3xl sm:text-4xl font-semibold text-blue-500">
                      Our Departments
                  </h1>
                  <h1 className="text-right text-3xl sm:text-3xl font-semibold text-blue-900">
                      <Link to={'/departments'}>
                          See All
                      </Link>
                  </h1>
              </div>
              <div className="bg-purple-50 mb-4">
                <DepartmentGrid rowsToShow={'seeAll'} />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-2">
                  <h1 className="text-left text-3xl mb-4 sm:text-4xl font-semibold text-blue-500">
                      Our Specialists
                  </h1>
                  <h1 className="text-right text-3xl sm:text-4xl font-semibold text-blue-900">
                      <Link to={'/doctors'}>
                          See All
                      </Link>
                  </h1>
              </div>

              <div className="bg-purple-50 mb-4 mt-6">
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
