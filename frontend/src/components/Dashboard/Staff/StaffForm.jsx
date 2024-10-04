import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffForm = ({ staffId, onSuccess, onCancel }) => {
    const [staffData, setStaffData] = useState({
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

    useEffect(() => {
        if (staffId) {
            const fetchStaff = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/staffs/${staffId}`);
                    setStaffData(response.data);
                } catch (error) {
                    alert('Error fetching staff data.');
                }
            };
            fetchStaff();
        }
    }, [staffId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setStaffData({ ...staffData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (staffId) {
                await axios.put(`http://localhost:5000/api/admin/staffs/${staffId}`, staffData);
                alert('Staff member updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/admin/staffs', staffData);
                alert('Staff member created successfully.');
            }
            onSuccess();
        } catch (error) {
            alert('Error saving staff data: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    id="fname"
                    value={staffData.fname}
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
                    value={staffData.lname}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    id="email"
                    value={staffData.email}
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
                    value={staffData.phone}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Gender:</label>
                <input
                    type="text"
                    id="gender"
                    value={staffData.gender}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Role:</label>
                <input
                    type="text"
                    id="role"
                    value={staffData.role}
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
                    value={staffData.department}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    id="employee_id"
                    value={staffData.employee_id}
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
                    value={staffData.address}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    id="description"
                    value={staffData.description}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Profile URL:</label>
                <input
                    type="text"
                    id="url"
                    value={staffData.url}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                    {staffId ? 'Update Staff' : 'Create Staff'}
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default StaffForm;
