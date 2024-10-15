import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PrescriptionForm } from './PrescriptionForm'; 

const DoctorAppointments = ({ doctorId }) => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [currentAppointment, setCurrentAppointment] = useState(null); // Store full appointment data

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/appointments/${doctorId}`);
                setAppointments(response.data);
            } catch (error) {
                setError(error.response?.data?.error || "Error fetching appointments");
            }
        };

        fetchAppointments();
    }, [doctorId]);

    const handleDoneClick = (appointment) => {
        setCurrentAppointment(appointment); // Pass the entire appointment object to access userId, etc.
    };

    const handlePrescriptionSaved = async () => {
        // Refresh the appointments after saving the prescription
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/appointments/${doctorId}`);
            setAppointments(response.data);
        } catch (error) {
            setError(error.response?.data?.error || "Error refreshing appointments");
        }
        setCurrentAppointment(null); // Close the prescription form
    };

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border">User ID</th>
                        <th className="border">Appointment Date</th>
                        <th className="border">Appointment Time</th>
                        <th className="border">Payment Status</th>
                        <th className="border">Appointment Status</th>
                        <th className="border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment._id}>
                            <td className="border">{appointment.user_id}</td>
                            <td className="border">{new Date(appointment.app_date).toLocaleDateString()}</td>
                            <td className="border">{appointment.app_time}</td>
                            <td className="border">{appointment.payment_Status ? "Paid" : "Pending"}</td>
                            <td className="border">{appointment.app_status}</td>
                            <td className="border">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDoneClick(appointment)}
                                >
                                    Done
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render the PrescriptionForm if a current appointment is selected */}
            {currentAppointment && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Add Prescription for Appointment {currentAppointment._id}</h3>
                    <PrescriptionForm
                        doctorId={doctorId}
                        userId={currentAppointment.user_id} // Pass userId from the appointment
                        appointmentId={currentAppointment._id}
                        onPrescriptionSaved={handlePrescriptionSaved}
                    />
                </div>
            )}
        </div>
    );
};

export default DoctorAppointments;
