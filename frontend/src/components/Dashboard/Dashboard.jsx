import { useState } from 'react';
import Sidebar from './SideBar/Sidebar';
import Topbar from './TopBar/Topbar';
import DoctorsTable from './Doctor/DoctorsTable';
import UsersTable from './UserTable/UsersTable';
import StaffTable from './Staff/StaffsTable';

export const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('doctors'); 
    
    const renderSection = () => {
        switch (activeSection) {
            case 'doctors':
                return <DoctorsTable />;
            case 'users':
                return <UsersTable />;
            case 'staff':
                return <StaffTable />;
            default:
                return <DoctorsTable />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <div className="w-64 bg-white border-r">
                    <Sidebar setActiveSection={setActiveSection} />
                </div>
                <div className="flex-1 flex flex-col">
                    <Topbar />
                    <div className="p-6 bg-gray-100 flex-grow">
                        {renderSection()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
