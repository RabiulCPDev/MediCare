import { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorsTable = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
       
        axios.get('http://localhost:5000/api/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Doctors</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Specialization</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor._id}>
                            <td className="py-2 px-4 border">{doctor.fname} {doctor.lname}</td>
                            <td className="py-2 px-4 border">{doctor.specialization}</td>
                            <td className="py-2 px-4 border">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorsTable;
