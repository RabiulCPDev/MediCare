import axios from 'axios';
import { storage } from '../../firebaseConfig'; // Import the storage from firebase config
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // To generate unique filenames

export const UserAccount = () => {
    const location = useLocation();
    const navigate =useNavigate();
    const { user: initialUser } = location.state;
    const [user, setUser] = useState(initialUser); 
    const [appointment, setAppointment] = useState([]);
    const [services, setService] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); 
    const [isUploading, setIsUploading] = useState(false); 
    const [showUpdateButton, setShowUpdateButton] = useState(false); // State for showing the update button

    // Function to handle the image click
    const handleImageClick = () => {
        setShowUpdateButton(true); 
    };

    // Function to handle file selection
    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            uploadImage(event.target.files[0]);
        }
    };

    // Function to upload image to Firebase
    const uploadImage = async (file) => {
        if (!file) return;
        const fileName = `${uuidv4()}-${file.name}`;
        const fileRef = ref(storage, `profile_pictures/${fileName}`);
        setIsUploading(true);
        try {
            // Upload the file
            await uploadBytes(fileRef, file);
            // Get the download URL
            const downloadURL = await getDownloadURL(fileRef);
            console.log("Image uploaded successfully. URL: ", downloadURL);
            // Update the user's profile image URL with downloadURL
            await updateUserProfileImage(downloadURL);
          
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
        setIsUploading(false);
    };

    const updateUserProfileImage = async (imageUrl) => {
        try {
            await axios.put(`http://localhost:5000/api/user/updateProfileImage/${user._id}`, {
                image_url: imageUrl,
            });
            console.log("Profile image updated successfully.");
            setShowUpdateButton(false);
            setUser((prevUser) => ({ ...prevUser, user_url: imageUrl }));
        } catch (error) {
            console.error("Error updating profile image: ", error);
        }
    };

    // Function to delete the image from Firebase and database
    const handleDeleteImage = async () => {
        if (!user.user_url) return; 

        const fileRef = ref(storage, user.user_url);

        try {
            // Delete the image from Firebase
            await deleteObject(fileRef);
            console.log("Image deleted from Firebase");

            // Remove the image URL from the database
            await axios.put(`http://localhost:5000/api/user/removeProfileImage/${user._id}`);
            console.log("Image URL removed from the database");

            // Update the state to remove the image
            setUser((prevUser) => ({ ...prevUser, user_url: null }));
            setShowUpdateButton(false); // Hide update button if no image exists
        } catch (error) {
            console.error("Error deleting image: ", error);
        }
    };

    // Fetching appointments and services
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/appointments/${user._id}`);
                const response = await axios.get(`http://localhost:5000/api/user/services/${user._id}`);
                
                setAppointment(res.data);
                setService(response.data);
            } catch (error) {
                console.error("Error fetching appointments", error);
            }
        };

        fetchAppointments();
    }, [user._id]);

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <div>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                    <img
                        src={user.user_url || 'https://via.placeholder.com/150'}
                        alt={`${user.fname} ${user.lname}`}
                        className="w-32 h-32 rounded-full mx-auto mb-4 cursor-pointer"
                        onClick={handleImageClick} // Handle image click
                    />
                    {showUpdateButton && (
                        <>
                            <button
                                onClick={() => document.getElementById('fileInput').click()} // Trigger file input click
                                className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                            >
                                Update Picture
                            </button>

                            {/* Delete Image button */}
                            {user.user_url && (
                                <button
                                    onClick={handleDeleteImage}
                                    className="mt-2 bg-red-500 text-white rounded px-4 py-2"
                                >
                                    Delete Picture
                                </button>
                            )}
                        </>
                    )}
                    {isUploading && <p className="text-center text-blue-500">Uploading...</p>}
                </div>

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
                            <td className="py-2 px-4 border-gray-300 border">{user.address || 'N/A'}</td>
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
                            <td className="py-2 px-4 border-gray-300 border">Joining Date</td>
                            <td className="py-2 px-4 border-gray-300 border">
                                <span className="text-gray-500">{new Date(user.joining_date).toLocaleDateString()}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {appointment.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-500 mt-4">
                        <thead className="mt-4 justify-center">
                            <tr>
                                <th className="py-2 px-4 border border-gray-300 text-left">Doctor Name</th>
                                <th className="py-2 px-4 border border-gray-300 text-left">Appointment Time & Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointment.map((ap, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-gray-300 border">{ap.doctor_name}</td>
                                    <td className="py-2 px-4 border-gray-300 border">{new Date(ap.app_time).toLocaleString()} - {new Date(ap.app_date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No appointments found.</p>
                )}

                {services.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-500 mt-4">
                        <thead className="mt-4 justify-center">
                            <tr>
                                <th className="py-2 px-4 border border-gray-300 text-left">Service Name</th>
                                <th className="py-2 px-4 border border-gray-300 text-left">Service Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-gray-300 border">{service.name}</td>
                                    <td className="py-2 px-4 border-gray-300 border">{service.fee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No services found.</p>
                )}
            </div>
        </div>
    );
};
