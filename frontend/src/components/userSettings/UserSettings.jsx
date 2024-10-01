import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const UserSettings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state; 
    const [errors,setError]=useState(null);
    const [formData, setFormData] = useState({
        fname: user.fname,
        lname: user.lname,
        phone: user.phone,
        gender: user.gender,
        age: user.age,
        address: user.address,
        medical_description: user.medical_description,
        current_treatment: user.current_treatment,
        doctor_incharge: user.doctor_incharge,
        payment_status: user.payment_status,
        current_password: '', 
        new_password: '', 
        confirm_password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.new_password !== formData.confirm_password) {
            setError("New passwords do not match")
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            const { current_password, new_password, ...otherData } = formData;

            await axios.put('http://localhost:5000/api/user/update-password', { 
                current_password, 
                new_password, 
                ...otherData 
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            alert("User details and password updated successfully!");
            setError("");
            navigate('/account');
        } catch (error) {
            console.error("Error updating user details or password:", error);
            setError("Please provide correct credential and try again");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700">Medical Description</label>
                        <textarea
                            name="medical_description"
                            value={formData.medical_description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-gray-700">Current Treatment</label>
                        <textarea
                            name="current_treatment"
                            value={formData.current_treatment}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700">Doctor In Charge</label>
                        <input
                            type="text"
                            name="doctor_incharge"
                            value={formData.doctor_incharge}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Payment Status</label>
                        <select
                            name="payment_status"
                            value={formData.payment_status}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        >
                            <option value={false}>Unpaid</option>
                            <option value={true}>Paid</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Current Password</label>
                        <input
                            type="password"
                            name="current_password"
                            value={formData.current_password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    
                </div>
                {errors && (
                        <p className="text-red-500 text-xl mt-1 text-center">{errors}</p>
                    )}
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}