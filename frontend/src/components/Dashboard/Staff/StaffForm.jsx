import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffForm = ({ staffData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: '',
        role: '',
        department: '',
        employee_id: '',
        address: '',
        description: '',
        url: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (staffData) {
            setFormData(staffData);
        } else {
            setFormData({
                fname: '',
                lname: '',
                email: '',
                phone: '',
                gender: '',
                role: '',
                department: '',
                employee_id: '',
                address: '',
                description: '',
                url: ''
            }); // Reset form for new staff creation
        }
    }, [staffData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (staffData && staffData._id) { 
                await axios.put(`http://localhost:5000/api/admin/staffs/${staffData._id}`, formData);
                alert('Staff member updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/admin/staffs', formData);
                alert('Staff member created successfully.');
            }
            onSuccess(); // Call success handler after submission
        } catch (error) {
            setError('Error saving staff data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    id="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    id="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Gender:</label>
                <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Role:</label>
                <input
                    type="text"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Department:</label>
                <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    id="employee_id"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Profile URL:</label>
                <input
                    type="text"
                    id="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded" disabled={loading}>
                    {staffData && staffData._id ? 'Update Staff' : 'Create Staff'}
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default StaffForm;
