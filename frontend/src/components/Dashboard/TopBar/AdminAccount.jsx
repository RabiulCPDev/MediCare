import { useEffect, useState } from 'react';
import axios from 'axios';

export const AdminAccount = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const token = sessionStorage.getItem('adminToken');

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Token:', token); 
                console.log('Response:', res.data); 
                setAdminDetails(res.data);
            } catch (error) {
                
                console.error('Error fetching admin details:', error.response ? error.response.data : error.message);
            }
        };

        if (token) {
            fetchAdminDetails();
        } else {
            console.log('No token found. Redirect to login.');
        }
    }, [token]);

    if (!adminDetails) {
        return <div>Loading admin details...</div>;
    }

    return (
        <div className="p-6 bg-white shadow-md justify-center rounded-md max-w-lg mx-auto mt-8">
            <h2 className="text-2xl text-center font-bold mb-4">Account Details</h2>
            <p><strong>Username :</strong> {adminDetails.username}</p>
            <p><strong>ID :</strong> {adminDetails.admin_id}</p>
            <p><strong>Role :</strong> {adminDetails.role}</p>
        </div>
    );
};
