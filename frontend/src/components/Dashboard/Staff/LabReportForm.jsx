import React, { useState } from 'react';
import axios from 'axios';

export const LabReportForm = ({ onReportSubmitted }) => {
    const [patientId, setPatientId] = useState('');
    const [reportDetails, setReportDetails] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Submit lab report data to the server
            await axios.post('http://localhost:5000/api/staff/labReports', {
                patient_id: patientId,
                details: reportDetails,
            });
            alert("Lab report submitted!");
            onReportSubmitted(); // Trigger any action after submission
        } catch (error) {
            setError('Failed to submit lab report. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Lab Report</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="patientId">Patient ID</label>
                <input
                    type="text"
                    id="patientId"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="reportDetails">Report Details</label>
                <textarea
                    id="reportDetails"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                Submit Report
            </button>
        </form>
    );
};
