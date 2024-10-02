import { createBrowserRouter } from "react-router-dom";
import { HomePage } from '../pages/HomePage';
import { About } from '../pages/About';
import { Contacts } from '../pages/Contacts';
import { Doctors } from '../pages/Doctors';
import { Register } from '../pages/Register';
import { Services } from '../pages/Services';
import { LogIn } from '../pages/LogIn';
import{Departments} from '../pages/Departments';
import {DoctorProfile} from"../components/doctor/DoctorProfile";
import { UserAccount } from "../components/userSettings/UserAccount";
import {UserSettings} from"../components/userSettings/UserSettings";
import { Appoinment } from "../pages/Appointment";
import {DepartmentProfile} from "../components/department/DepartmentProfile";
import { ServiceProfile } from "../components/Services/ServiceProfile";
export const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
  
        {
          path:'about',
          element: <About/>
        },
        {
          path:'contacts',
          element: <Contacts/>
        },
        {
          path: 'doctors',
          element: <Doctors/>
        },
        {
          path:'services',
          element: <Services/>
        },
        {
          path:'services/:id',
          element: <ServiceProfile/>
        },
        {
          path: 'register',
          element: <Register/>
        },
        {
          path: 'login',
          element: <LogIn/>
        },
        {
          path: 'departments',
          element: <Departments/>
        },
        {
          path: 'departments/:id',
          element: <DepartmentProfile/>
        },
        {
          path: 'userSettings',
          element: <UserSettings/>
        },
        {
          path:'/account',
          element:<UserAccount/>
        },{
          path: 'doctor/:id',
          element: <DoctorProfile/>
        },{
          path: 'appoinment/:id',
          element: <Appoinment/>
        }
      ],
    }
   
  ])

  