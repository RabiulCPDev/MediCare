import { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentForm = ({ departmentData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        department_id: '',
        url: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (departmentData) {
            setFormData(departmentData);
        } else {
            setFormData({
                name: '',
                department_id: '',
                url: '',
                description: '',
            });
        }
    }, [departmentData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (departmentData && departmentData._id) {
                await axios.put(`http://localhost:5000/api/admin/departments/${departmentData._id}`, formData);
                alert('Department updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/admin/departments', formData);
                alert('Department created successfully.');
            }
            onSuccess(); // Call success handler after submission
        } catch (error) {
            setError('Error saving department data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label>Department Name:</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Department ID:</label>
                <input
                    type="text"
                    id="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>URL:</label>
                <input
                    type="text"
                    id="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded" disabled={loading}>
                    {departmentData && departmentData._id ? 'Update Department' : 'Create Department'}
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default DepartmentForm;
