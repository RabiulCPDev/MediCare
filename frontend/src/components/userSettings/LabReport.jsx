import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { LabReportForm } from './LabReportForm';

export const LabReport = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [showForm, setShowForm] = useState(false);
    const [labReports, setLabReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the lab reports when the component is mounted
    useEffect(() => {
        if (!user || !user._id) {
            setError("User data is missing. Please refresh the page or try again.");
            setLoading(false);
            return;
        }

        const fetchLabReports = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/labreports/user/${user._id}`);
                setLabReports(response.data); // Assuming the response contains an array of lab reports
            } catch (error) {
                console.error('Error fetching lab reports', error);
                setError('Failed to fetch lab reports. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLabReports();
    }, [user]);

    // Function to generate and download a PDF for a specific report
    const downloadPDF = (report) => {
        const doc = new jsPDF();
        doc.text(`Doctor: ${report.doctor_name}`, 10, 10);
        doc.text(`User ID: ${report.user_id}`, 10, 20);
        doc.text(`Technician ID: ${report.technician_id}`, 10, 30);
        doc.text('Tests:', 10, 40);
        report.test.forEach((test, i) => {
            doc.text(`${i + 1}. ${test}`, 10, 50 + i * 10);
        });
        doc.text(`Date: ${new Date(report.date).toLocaleDateString()}`, 10, 70);
        doc.save(`LabReport_${new Date(report.date).toLocaleDateString()}.pdf`);
    };

    // Toggle the form visibility
    const toggleForm = () => {
        setShowForm((prev) => !prev);
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-4">Lab Reports</h2>

            <button
                onClick={toggleForm}
                className="w-full mb-4 p-2 bg-green-500 text-white rounded"
            >
                {showForm ? 'Close Lab Report Form' : 'Apply Lab Report'}
            </button>

            {showForm && (
                <LabReportForm setShowForm={setShowForm} user={user} />
            )}

            {labReports.length > 0 ? (
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Download Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labReports.map((report, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{new Date(report.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => downloadPDF(report)}
                                        className="p-2 bg-blue-500 text-white rounded"
                                    >
                                        Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No lab reports found for this user.</p>
            )}
        </div>
    );
};
