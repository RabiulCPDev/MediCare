import { useEffect, useState } from 'react';
import Sidebar from './SideBar/Sidebar';
import { Topbar } from './TopBar/Topbar';
import DoctorsTable from './Doctor/DoctorsTable';
import UsersTable from './UserTable/UsersTable';
import StaffTable from './Staff/StaffsTable';
import ServiceTable from './Service/ServiceTable';
import DepartmentTable from './Department/DepartmentTable';
import { useNavigate } from 'react-router-dom';
import { AdminUpdateProfile } from './TopBar/AdminUpdateProfile';
import { AdminAccount } from './TopBar/AdminAccount';
import DoctorAppointments from './Doctor/DoctorAppointments';
import axios from 'axios';
import TechnicianLabTests from './Staff/TechnicianLabTests';

export const Dashboard = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('adminToken');
    const [activeSection, setActiveSection] = useState('');
    const [adminRole, setAdminRole] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [stats, setStats] = useState({
        doctors: 0,
        users: 0,
        staff: 0,
        services: 0,
        departments: 0,
        appointments: 0,
        labreports:0,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/admin');
            return;
        }

        const fetchAdminRole = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDoctorId(response.data.admin_id);
                setAdminRole(response.data.role);
            } catch (error) {
                console.error('Error fetching admin role:', error);
                setError('Failed to fetch admin role. Please try again.');
            }
        };

        const fetchStats = async () => {
            try {
                const doctorRes = await axios.get('http://localhost:5000/api/admin/doctors');
                const userRes = await axios.get('http://localhost:5000/api/admin/users');
                const staffRes = await axios.get('http://localhost:5000/api/admin/staffs');
                const serviceRes = await axios.get('http://localhost:5000/api/admin/services');
                const departmentRes = await axios.get('http://localhost:5000/api/admin/departments');
                const appointmentRes = await axios.get(`http://localhost:5000/api/admin/appointments/${doctorId}`);
                const labReportRes =await axios.get('http://localhost:5000/api/technician/labtests');
               
                setStats({
                    doctors: doctorRes.data.length,
                    users: userRes.data.length,
                    staff: staffRes.data.length,
                    services: serviceRes.data.length,
                    departments: departmentRes.data.length,
                    appointments: appointmentRes.data.length,
                    labreports:labReportRes.data.length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
              //  setError('Failed to fetch statistics. Please try again.');
            }
        };

        fetchAdminRole();
        fetchStats();
    }, [navigate, token, doctorId]); // Add doctorId as dependency to refetch

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
            case 'appointments': // For doctors to see appointments
                return <DoctorAppointments doctorId={doctorId} />;
            case 'updateAdmin':
                return <AdminUpdateProfile setActiveSection={setActiveSection} />;
            case 'adminAccount':
                return <AdminAccount />;
            case 'labReport':
                return <TechnicianLabTests technicianId={doctorId}/>;
            default:
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {adminRole === 'admin' && (
                            <>
                                <Card
                                    title="Total Doctors"
                                    count={stats.doctors}
                                    onClick={() => setActiveSection('doctors')}
                                />
                                <Card
                                    title="Total Users"
                                    count={stats.users}
                                    onClick={() => setActiveSection('users')}
                                />
                                <Card
                                    title="Total Staff"
                                    count={stats.staff}
                                    onClick={() => setActiveSection('staff')}
                                />
                                <Card
                                    title="Total Services"
                                    count={stats.services}
                                    onClick={() => setActiveSection('services')}
                                />
                                <Card
                                    title="Total Departments"
                                    count={stats.departments}
                                    onClick={() => setActiveSection('departments')}
                                />
                            </>
                        )}
                        {adminRole === 'doctor' && (
                            <Card
                                title="Appointments"
                                count={stats.appointments}
                                onClick={() => setActiveSection('appointments')}
                            />
                        )}
                        
                        {adminRole === 'staff' && (
                            <Card
                                title="Create Lab Report"
                                count={stats.labreports}
                                onClick={() => setActiveSection('labReport')}
                            />
                        )}

                    </div>
                );
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                {adminRole==='admin' &&(
                    <div className="w-64 bg-white border-r">
                    <Sidebar setActiveSection={setActiveSection} />
                </div>
                )
                }
                <div className="flex-1 flex flex-col">
                    <Topbar setActiveSection={setActiveSection}role={adminRole} />
                    <div className="p-6 bg-gray-100 flex-grow">
                        {error && <div className="text-red-500">{error}</div>}
                        {renderSection()}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Card Component
const Card = ({ title, count, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
        >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-3xl font-bold">{count}</p>
        </div>
    );
};
