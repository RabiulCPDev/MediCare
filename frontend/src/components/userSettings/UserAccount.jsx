import { useLocation } from "react-router-dom";

export const UserAccount = () => {
   const location = useLocation();
   const {user} = location.state;
    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
            
                <div>
                    
                    <img
                        src={user.user_url || 'https://via.placeholder.com/150'}
                        alt={`${user.fname} ${user.lname}`}
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">{user.fname}'s Profile</h2>
                    <table className="min-w-full bg-white border border-gray-500 mt-4">
                
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border border-gray-300 text-left">Field</th>
                            <th className="py-2 px-4 border border-gray-300 text-left">Value</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">First Name</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.fname}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Last Name</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.lname}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Email</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.email}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Phone</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.phone}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Gender</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.gender}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Age</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.age}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Address</td>
                                <td className="py-2 px-4 border-b">{user.address || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Medical Description</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.medical_description || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Current Treatment</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.current_treatment || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Payment Status</td>
                                <td className="py-2 px-4 border-gray-300 border">
                                    <span className={user.payment_status ? 'text-green-500' : 'text-red-500'}>
                                        {user.payment_status ? 'Paid' : 'Unpaid'}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Doctor In Charge</td>
                                <td className="py-2 px-4 border-gray-300 border">{user.doctor_incharge || 'N/A'}</td>
                            </tr>
                            {/* <tr>
                                <td className="py-2 px-4 border-b">User URL</td>
                                <td className="py-2 px-4 border-b">{user.user_url || 'N/A'}</td>
                            </tr> */}
                            <tr>
                                <td className="py-2 px-4 border-gray-300 border">Joining Date</td>
                                <td className="py-2 px-4 border-gray-300 border">
                                    <span className="text-gray-500">{new Date(user.joining_date).toLocaleDateString()}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    );
};
