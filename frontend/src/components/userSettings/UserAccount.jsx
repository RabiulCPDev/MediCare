// UserAccount.js
import axios from 'axios';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const UserAccount = () => {
    const location = useLocation();
    const { user: initialUser } = location.state;
    const [user, setUser] = useState(initialUser);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showUpdateButton, setShowUpdateButton] = useState(false);

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
            await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(fileRef);
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
            setUser((prevUser) => ({ ...prevUser, user_url: imageUrl }));
            setShowUpdateButton(false);
        } catch (error) {
            console.error("Error updating profile image: ", error);
        }
    };

    // Function to delete the image from Firebase and database
    const handleDeleteImage = async () => {
        if (!user.user_url) return;
        const fileRef = ref(storage, user.user_url);
        try {
            await deleteObject(fileRef);
            await axios.put(`http://localhost:5000/api/user/removeProfileImage/${user._id}`);
            setUser((prevUser) => ({ ...prevUser, user_url: null }));
            setShowUpdateButton(false);
        } catch (error) {
            console.error("Error deleting image: ", error);
        }
    };

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
                        onClick={() => setShowUpdateButton(true)}
                    />
                    {showUpdateButton && (
                        <>
                            <button
                                onClick={() => document.getElementById('fileInput').click()}
                                className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                            >
                                Update Picture
                            </button>
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
            </div>
        </div>
    );
};
