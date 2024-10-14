import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const ServicePayment = () => {
    const { state } = useLocation();
    const { services } = state;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                navigate('/login');
            } else {
                try {
                    const response = await axios.get('http://localhost:5000/api/user/data', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    navigate('/login');
                }
            }
        };

        fetchUserData();
    }, [navigate, token]); 
    const handlePayment = async () => {
        if (!user) {
            console.error('User data is not available');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/service/payment', {
                name: services.name,
                service_id: services._id,
                user_id: user._id,  
                fee: services.fee
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Payment for {services.name}
                </h2>
                <p className="text-lg text-center mb-6">
                    Service Fee: <span className="font-semibold">${services.fee}</span>
                </p>
                <button
                    onClick={handlePayment}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};
