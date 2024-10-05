import { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';

const DepartmentTable = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/departments');
            setDepartments(response.data);
        } catch (error) {
            setError('Error fetching department data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleDelete = async (departmentId) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/departments/${departmentId}`);
                setDepartments(departments.filter(department => department._id !== departmentId));
                alert('Department deleted successfully.');
            } catch (error) {
                alert('Error deleting department.');
            }
        }
    };

    const handleEdit = (department) => {
        setSelectedDepartment(department);
        setShowForm(true);
    };

    const handleCreate = () => {
        setSelectedDepartment(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedDepartment(null);
        fetchDepartments();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Departments</h2>
            <button onClick={handleCreate} className="bg-green-500 text-white px-3 py-1 rounded mb-4">Create Department</button>
            
            {showForm ? (
                <DepartmentForm departmentData={selectedDepartment} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Department Name</th>
                            <th className="py-2 px-4 border">Department ID</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department._id}>
                                <td className="py-2 px-4 border">{department.name}</td>
                                <td className="py-2 px-4 border">{department.department_id}</td>
                                <td className="py-2 px-4 border">
                                    <button onClick={() => handleEdit(department)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(department._id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DepartmentTable;
