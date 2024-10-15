import { useState } from 'react';
import { storage } from '../../firebaseConfig'; // Make sure to import your Firebase configuration
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase storage methods

const ImageUploader = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Upload image to Firebase and track progress
    const uploadImage = (file, folder) => {
        return new Promise((resolve, reject) => {
            const fileRef = ref(storage, `${folder}/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            // Listen to the state of the upload
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get progress percentage
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress); // Update progress state
                },
                (error) => {
                    // Handle upload error
                    reject(error);
                },
                async () => {
                    // Handle successful uploads and get the download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL); // Resolve with the download URL
                }
            );
        });
    };

    // Handle image upload and send URL back
    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return; // Ensure file is selected
        try {
            const downloadURL = await uploadImage(selectedFile, 'department_images'); // Upload image to Firebase
            onUploadSuccess(downloadURL); // Send the URL back to the parent component
            setUploadProgress(0); // Reset the progress after upload is done
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleImageUpload} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
                Upload Image
            </button>

            {uploadProgress > 0 && (
                <div className="mt-2">
                    <p>Upload Progress: {Math.round(uploadProgress)}%</p>
                    <div className="w-full bg-gray-200 rounded">
                        <div
                            className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
                            style={{ width: `${uploadProgress}%` }}
                        >
                            {Math.round(uploadProgress)}%
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
