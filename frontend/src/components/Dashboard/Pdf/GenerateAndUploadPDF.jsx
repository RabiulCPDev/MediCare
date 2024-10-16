import { PDFDocument, rgb } from 'pdf-lib';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'; 

export const GenerateAndUploadPDF = async ({ doctorId, userId, medicines }) => {
    try {
        // 1. Fetch doctor and user details from the backend
        const doctorRes = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
        const userRes = await axios.get(`http://localhost:5000/api/user/${userId}`);
        
        const doctorName = `${doctorRes.data.fname} ${doctorRes.data.lname}`;
        const doctorSpecialization = doctorRes.data.specialization;
        const userName = `${userRes.data.fname} ${userRes.data.lname}`;
        const userAge = userRes.data.age;

        // 2. Create a new PDF Document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();// Ensure this is required

        // 3. Add content to the PDF
        page.drawText(`Doctor: ${doctorName}`, {
            x: 50,
            y: height - 50,
            size: 18,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Specialization: ${doctorSpecialization}`, {
            x: 50,
            y: height - 80,
            size: 18,
            color: rgb(0, 0, 0),
        });
        page.drawText(`User: ${userName}`, {
            x: 50,
            y: height - 110,
            size: 18,
            color: rgb(0, 0, 0),
        });
        page.drawText(`Age: ${userAge}`, {
            x: 50,
            y: height - 140,
            size: 18,
            color: rgb(0, 0, 0),
        });
        page.drawText('Prescriptions:', {
            x: 50,
            y: height - 170,
            size: 18,
            color: rgb(0, 0, 0),
        });

        // 4. Add each medicine with dosage
        medicines.forEach((medicine, index) => {
            page.drawText(`${index + 1}. ${medicine}`, {
                x: 60,
                y: height - (200 + index * 20),
                size: 16,
                color: rgb(0, 0, 0),
            });
        });

        // 5. Serialize the PDF Document to bytes
        const pdfBytes = await pdfDoc.save();

        // 6. Upload the PDF to Firebase
        const storage = getStorage(); // Initialize Firebase storage
        const pdfRef = ref(storage, `prescriptions/${doctorId}-${userId}.pdf`); // Create a reference for the file
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

        await uploadBytes(pdfRef, pdfBlob);

        // 7. Get the download URL
        const downloadURL = await getDownloadURL(pdfRef);
        
        console.log("PDF uploaded successfully. Download URL:", downloadURL);

        // Optionally, return or store the URL in your database
        return downloadURL;

    } catch (error) {
        console.error("Error generating/uploading PDF:", error);
    }
};
