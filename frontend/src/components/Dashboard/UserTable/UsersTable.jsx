import { useState, useEffect } from 'react';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({ fname: '', lname: '', email: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users');
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                alert('Error deleting user.');
            }
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/users', newUser);
            setUsers([...users, response.data]);
            setNewUser({ fname: '', lname: '', email: '' });
            setIsAdding(false);
        } catch (error) {
            alert('Error adding user.');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setIsAdding(!isAdding)}
            >
                {isAdding ? 'Cancel' : 'Add User'}
            </button>

            {isAdding && (
                <form onSubmit={handleAddUser} className="mb-4">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        value={newUser.fname} 
                        onChange={(e) => setNewUser({ ...newUser, fname: e.target.value })} 
                        required 
                        className="border p-2 mr-2"
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        value={newUser.lname} 
                        onChange={(e) => setNewUser({ ...newUser, lname: e.target.value })} 
                        required 
                        className="border p-2 mr-2"
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={newUser.email} 
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                        required 
                        className="border p-2 mr-2"
                    />

<input 
                        type="text" 
                        placeholder="Phone" 
                        value={newUser.phone} 
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
                        required 
                        className="border p-2 mr-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
                </form>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
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
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UsersTable;
