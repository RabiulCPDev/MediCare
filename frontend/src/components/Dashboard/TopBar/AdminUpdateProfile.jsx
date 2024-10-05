import { useState, useEffect } from 'react';
import axios from 'axios';

export const AdminUpdateProfile = ({setActiveSection}) => {
    const [adminData, setAdminData] = useState({
        username: '',
        previousPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/profile', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('adminToken')}`
                    }
                });
                setAdminData(prevData => ({
                    ...prevData,
                    username: response.data.username,
                }));
            } catch (error) {
                setError('Error fetching admin data. Please try again.');
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        

        if (adminData.newPassword !== adminData.confirmPassword) {
            setError('New passwords do not match!');
            setLoading(false);
            return;
        }

        try {
            await axios.put('http://localhost:5000/api/admin/updateprofile', {
                username: adminData.username,
                previousPassword: adminData.previousPassword, 
                newPassword: adminData.newPassword 
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('adminToken')}`
                }
            });
            alert('Profile updated successfully!');
            setActiveSection('adminAccount');
        } catch (error) {
            setError('Error updating profile. Please try again.');
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
                {error && <p className="text-red-500">{error}</p>}
              
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={adminData.username}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="previousPassword"
                        value={adminData.previousPassword}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        placeholder="Previous Password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="newPassword"
                        value={adminData.newPassword}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        placeholder="New Password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={adminData.confirmPassword}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        placeholder="Confirm New Password"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};
