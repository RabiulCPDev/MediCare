// FileUpload.js
import React, { useState } from "react";
import { storage } from "../../firebaseConfig"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  return (
    <div>
        <form>
            <label htmlFor="name">Full name: </label>
            <input type="text" className="px-4 py-2 border rounded-lg bg-gray-100 focus:outline-dotted focus:ring-2" />
        </form>
    </div>
  );
};

export default FileUpload;
