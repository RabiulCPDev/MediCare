import { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching user data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
                alert('User deleted successfully.');
            } catch (error) {
                alert('Error deleting user.');
            }
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedUser(null);
        fetchUsers();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <button onClick={handleCreate} className="bg-green-500 text-white px-3 py-1 rounded mb-4">Create User</button>
            
            {showForm ? (
                <UserForm userData={selectedUser} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border">{user.fname} {user.lname}</td> 
                                <td className="py-2 px-4 border">{user.email}</td>
                                <td className="py-2 px-4 border">
                                    <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserTable;
