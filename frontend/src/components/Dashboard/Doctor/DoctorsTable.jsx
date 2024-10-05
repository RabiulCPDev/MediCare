import { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorsForm from './DoctorsForm'; 

const DoctorsTable = () => {
    const [doctors, setDoctors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setError('Error fetching doctors data.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchDoctors();
    }, []);

    const handleDelete = async (doctorId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`);
                setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
                alert('Doctor deleted successfully.');
            } catch (error) {
                alert('Error deleting doctor.');
            }
        }
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setShowForm(true);
    };

    const handleCreate = () => {
        setEditingDoctor(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingDoctor(null);
       
        const fetchDoctors = async () => {
            const response = await axios.get('http://localhost:5000/api/doctors');
            setDoctors(response.data);
        };
        fetchDoctors();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Doctors</h2>
            <button onClick={handleCreate} className="bg-green-500 text-white px-3 py-1 rounded mb-4">Create Doctor</button>
            
            {showForm ? (
                <DoctorsForm doctor={editingDoctor} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
            ) : (
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
                                    <button onClick={() => handleEdit(doctor)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(doctor._id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorsTable;
