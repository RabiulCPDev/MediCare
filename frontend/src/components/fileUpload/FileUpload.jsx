
import React, { useState } from "react";
import { storage } from "../../firebaseConfig"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
   

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          console.log("File available at", url);
        });
      }
    );
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Full name: </label>
        <input type="text" className="px-4 py-2 border rounded-lg bg-gray-100 focus:outline-dotted focus:ring-2" />

        <label htmlFor="file">Upload Image: </label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mt-2 mb-2"
        />
        <button 
          type="button" 
          onClick={handleUpload} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Upload
        </button>
      </form>

      {uploadProgress > 0 && (
        <div className="mt-4">
          <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
        </div>
      )}

      {downloadURL && (
        <div className="mt-4">
          <p>File uploaded successfully!</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">View Image</a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
