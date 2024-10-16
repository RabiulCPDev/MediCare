import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

export const Prescription = () => {
    const location = useLocation();
    const { user } = location.state; 
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch doctor's name by doctor_id
    const fetchDoctor = async (doctor_id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/doctors/${doctor_id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching doctor's name", error);
            return "Unknown Doctor";
        }
    };

    // Check if user exists before fetching prescriptions
    useEffect(() => {
        if (!user._id) {
            setError("User information is missing. Please refresh the page.");
            setLoading(false);
            return;
        }

        const fetchPrescriptions = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get(`http://localhost:5000/api/user/prescriptions/${user._id}`);
                setPrescriptions(response.data);
            } catch (error) {
                console.error("Error fetching prescriptions", error);
                setError("Failed to fetch prescriptions. Please try again later."); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchPrescriptions();
    }, [user._id]); // Include user in dependency array

    // Function to generate and download PDF for each prescription
    const downloadPDF = async (prescription) => {
        // Fetch doctor's name
        const doctor = await fetchDoctor(prescription.doctor_id);

        const doc = new jsPDF();
        doc.text(`User Name: ${user.fname}  ${user.lname}`, 10, 10);
        doc.text(`User Age: ${user.age}`, 10, 20);
        doc.text(`Doctor: ${doctor.fname} ${doctor.lname}`, 10, 30);
        doc.text(`Prescription Date: ${new Date(prescription.date).toLocaleDateString()}`, 10, 40);
        doc.text("Medicines:", 10, 50);

        if (Array.isArray(prescription.medicine)) {
            prescription.medicine.forEach((med, i) => {
                doc.text(`${i + 1}. ${med}`, 10, 60 + (i * 10)); // Dynamically position each medicine
            });
        } else {
            doc.text("No medicine information available.", 10, 60);
        }

        doc.save(`Prescription_${new Date(prescription.date).toLocaleDateString()}.pdf`);
    };

    
    if (loading) return <p className="text-center">Loading...</p>; 
    
    if (error) return <p className="text-center text-red-500">{error}</p>; 
   
    if (!user) return <h1 className="text-center">Something went wrong. Please refresh the page.</h1>;

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">Prescriptions</h3>
            {prescriptions.length > 0 ? (
                <ul className="list-disc list-inside">
                    {prescriptions.map((prescription, index) => (
                        <li key={index} className="py-2 border-b">
                            {/* Display only the prescription date */}
                            <span className="block">Prescription Date: {new Date(prescription.date).toLocaleDateString()}</span>
                            {/* Button to download the prescription as PDF */}
                            <button
                                onClick={() => downloadPDF(prescription)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Download PDF
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No prescriptions found.</p>
            )}
        </div>
    );
};
