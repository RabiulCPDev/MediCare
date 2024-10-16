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
import { Appointment } from "../pages/Appointment";
import {DepartmentProfile} from "../components/department/DepartmentProfile";
import { ServiceProfile } from "../components/Services/ServiceProfile";
import { AdminLogIn } from "../pages/AdminLogIn";
import {Dashboard} from "../components/Dashboard/Dashboard"
import { SuperAdminRegister } from "../pages/SuperAdminRegister";
import {AdminAccount} from "../components/Dashboard/TopBar/AdminAccount";
import { AdminUpdateProfile } from "../components/Dashboard/TopBar/AdminUpdateProfile";
import PaymentStatus from "../components/payment/PaymentStatus";
import { Hotline } from "../components/hero/Hotline";
import { Ambulance } from "../pages/Ambulance";
import { ServicePayment } from "../components/Services/ServicePayment";
import { AppointmentServices } from "../components/userSettings/AppointmentServices";
import { Prescription } from "../components/userSettings/Prescription";

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
          path: 'paymentStatus',
          element: <PaymentStatus/>
        },
        {
          path:'services',
          element: <Services/>
        },
        {
          path:'hotline',
          element: <Hotline/>
        },
        {
          path:'ambulance',
          element: <Ambulance/>
        },
        {
          path:'services/:id',
          element: <ServiceProfile/>
        },
        {
          path:'services/payment/:id',
          element: <ServicePayment/>
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
          path: 'userSettings/:id',
          element: <UserSettings/>
        },
        {
          path: 'prescriptions/:id',
          element: <Prescription />
        },
        {
          path: 'appointments/:id',
          element: <AppointmentServices />
        },
        {
          path:'account/:id',
          element:<UserAccount/>
        },{
          path: 'doctor/:id',
          element: <DoctorProfile/>
        },{
          path: 'appoinment/:id',
          element: <Appointment/>
        }
      ],
    },{
      path: '/admin',
      element: <AdminLogIn /> 
    }
    ,{
      path: '/admin/register',
      element:<SuperAdminRegister/> 
    },
    {
      path: '/admin/dashboard',
      element: (
       <Dashboard/>
      )
    },{
      path: '/admin/account', 
      element: <AdminAccount/>
    },
    {
      path: '/admin/updateprofile',
      element:<AdminUpdateProfile/>
    }
   
  ])