import { useEffect, useState } from 'react';
import Sidebar from './SideBar/Sidebar';
import {Topbar} from './TopBar/Topbar';
import DoctorsTable from './Doctor/DoctorsTable';
import UsersTable from './UserTable/UsersTable';
import StaffTable from './Staff/StaffsTable';
import ServiceTable from './Service/ServiceTable';
import DepartmentTable from './Department/DepartmentTable';
import { useNavigate } from 'react-router-dom';
import { AdminUpdateProfile } from './TopBar/AdminUpdateProfile';
import { AdminAccount } from './TopBar/AdminAccount';


export const Dashboard = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('adminToken');
    const [activeSection, setActiveSection] = useState('doctors');

    const renderSection = () => {
       
        switch (activeSection) {
            case 'doctors':
                return <DoctorsTable />;
            case 'users':
                return <UsersTable />;
            case 'staff':
                return <StaffTable />;
            case 'services':
                return <ServiceTable />;
            case 'departments':
                return <DepartmentTable />;
            case 'updateAdmin':
                return <AdminUpdateProfile setActiveSection={setActiveSection}/>
            case 'adminAccount':
                return <AdminAccount/>
            default:
                return <DoctorsTable />;
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [navigate]);


    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <div className="w-64 bg-white border-r">
                    <Sidebar setActiveSection={setActiveSection} />
                </div>
                <div className="flex-1 flex flex-col">
                    <Topbar setActiveSection={setActiveSection} />
                    <div className="p-6 bg-gray-100 flex-grow">
                        {renderSection()}
                    </div>
                </div>
            </div>
        </div>
    );
};
