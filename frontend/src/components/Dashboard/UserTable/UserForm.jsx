import { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userData) {
            setFormData(userData);
        } else {
            setFormData({
                fname: '',
                lname: '',
                email: '',
                phone: '',
                password: ''
            }); 
        }
    }, [userData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (userData && userData._id) {
                await axios.put(`http://localhost:5000/api/admin/users/${userData._id}`, formData);
                alert('User updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/admin/users', formData);
                alert('User created successfully.');
            }
            onSuccess(); // Call success handler after submission
        } catch (error) {
            setError('Error saving user data: ' + error.message);
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
                    required
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
                <label>Password:</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded" disabled={loading}>
                    {userData && userData._id ? 'Update User' : 'Create User'}
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UserForm;
