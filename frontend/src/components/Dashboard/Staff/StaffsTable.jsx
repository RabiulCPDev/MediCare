import { useState, useEffect } from 'react';
import axios from 'axios';
import StaffForm from './StaffForm';

const StaffTable = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingStaffId, setEditingStaffId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchStaff = async () => {
        try {
            console.log("Fetching staff data...");
            const response = await axios.get('http://localhost:5000/api/admin/staffs');
            console.log("Staff data received:", response.data);
            setStaff(response.data);
        } catch (error) {
            console.error("Error fetching staff data:", error);
            setError('Error fetching staff data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleDelete = async (staffId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/staffs/${staffId}`);
                setStaff(staff.filter(member => member._id !== staffId));
                alert('Staff member deleted successfully.');
            } catch (error) {
                alert('Error deleting staff.');
            }
        }
    };

    const handleEdit = (staffId) => {
        setEditingStaffId(staffId);
        setShowForm(true);
    };

    const handleCreate = () => {
        setEditingStaffId(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingStaffId(null);
        fetchStaff();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Staff</h2>
            <button onClick={handleCreate} className="bg-green-500 text-white px-3 py-1 rounded mb-4">Create Staff</button>
            {showForm ? (
                <StaffForm staffId={editingStaffId} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
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
                        {staff.map(member => (
                            <tr key={member._id}>
                                <td className="py-2 px-4 border">{member.name}</td>
                                <td className="py-2 px-4 border">{member.role}</td>
                                <td className="py-2 px-4 border">
                                    <button onClick={() => handleEdit(member._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
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
