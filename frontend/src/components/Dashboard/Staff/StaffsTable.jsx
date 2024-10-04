import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffForm from './StaffForm';

const StaffTable = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/staffs');
            setStaff(response.data);
        } catch (error) {
            setError('Error fetching staff data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleDelete = async (staffId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/staffs/${staffId}`);
                setStaff(staff.filter(member => member._id !== staffId));
                alert('Staff member deleted successfully.');
            } catch (error) {
                alert('Error deleting staff.');
            }
        }
    };

    const handleEdit = (member) => {
        setSelectedStaff(member);
        setShowForm(true);
    };

    const handleCreate = () => {
        setSelectedStaff(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedStaff(null);
        fetchStaff();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Staff</h2>
            <button onClick={handleCreate} className="bg-green-500 text-white px-3 py-1 rounded mb-4">Create Staff</button>
            
            {showForm ? (
                <StaffForm staffData={selectedStaff} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Role</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((member) => (
                            <tr key={member._id}>
                                <td className="py-2 px-4 border">{member.fname} {member.lname}</td> 
                                <td className="py-2 px-4 border">{member.role}</td>
                                <td className="py-2 px-4 border">
                                    <button onClick={() => handleEdit(member)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(member._id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StaffTable;
