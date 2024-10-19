import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const AppointmentServices = () => {
    const location = useLocation();
    const { user } = location.state;
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user._id) {
                console.error("Invalid user ID, cannot fetch appointments and services.");
                setError("Invalid user ID.");
                setLoading(false);
                return;
            }

            try {
                const appointmentsRes = await axios.get(`http://localhost:5000/api/user/appointments/${user._id}`);
                const servicesRes = await axios.get(`http://localhost:5000/api/user/services/${user._id}`);

                setAppointments(appointmentsRes.data);
                setServices(servicesRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
                setError("Error fetching appointments or services.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user._id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4 mt-4">
            {appointments.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-500 mt-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 text-left">Doctor Name</th>
                            <th className="py-2 px-4 border border-gray-300 text-left">Appointment Time & Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((ap, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border border-gray-300">{ap.doctor_name}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    {`${ap.app_time} - ${new Date(ap.app_date).toLocaleDateString()}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No appointments found.</p>
            )}

            {services.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Services</h3>
                    <ul className="list-none list-inside">
                        {services.map((service, index) => (
                            <li key={index}>{`${service.name} - ${service.fee}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
