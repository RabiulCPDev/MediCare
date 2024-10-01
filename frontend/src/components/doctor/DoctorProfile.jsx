import React from 'react';
import { useLocation } from 'react-router-dom';

export const DoctorProfile = () => {
    const location = useLocation();
    const { doctor } = location.state; 

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <div className="flex flex-col items-center">
                <div className="h-40 w-40 rounded-full shadow-xl">
                    <img src={doctor.url} alt="Doctor" className="rounded-full shadow-xl" />
                </div>
                <h1 className="text-2xl font-semibold mt-4">{doctor.fname} {doctor.lname}</h1>
                <p className="text-xl">{doctor.specialization} Specialist</p>
                <table className="min-w-full mt-4 border-collapse border border-gray-300">
                    <tbody >

                        <tr>
                            <td className="border text-center border-gray-300 p-2">Qualifications:</td>
                            <td className="border text-center border-gray-300 p-2">
                                <div className="flex flex-wrap justify-center">
                                    {doctor.qualifications.map((qualification, index) => (
                                        <span key={index} className='mx-1'>
                                            {qualification}
                                        </span>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Department:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.department}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Experience:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.years_of_experience || 0} years</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Consultation Fee:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.consultation_fee} taka</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">License Number:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.license_number}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Email:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.email}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Phone:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.phone}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Gender:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.gender}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Address:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.address}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Description:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.description}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Joining Date:</td>
                            <td className="border text-center border-gray-300 p-2">{new Date(doctor.joining_date).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Room Number:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.room_number}</td>
                        </tr>
                        <tr>
                            <td className="border text-center border-gray-300 p-2">Employee ID:</td>
                            <td className="border text-center border-gray-300 p-2">{doctor.employee_id}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
    );
};
