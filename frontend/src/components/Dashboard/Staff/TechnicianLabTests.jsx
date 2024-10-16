import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LabReportForm } from './LabReportForm'; 

const TechnicianLabTests = ({ technicianId }) => {
    const [labTests, setLabTests] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const [currentTest, setCurrentTest] = useState(null); 

    useEffect(() => {
        const fetchLabTests = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/technician/labtests`);
                console.log(response.data); // Check what the response looks like
                
                // Assuming the response directly returns an array of lab tests
                // If your API response structure is different, adjust accordingly
                setLabTests(response.data); // Set labTests to the response data directly

            } catch (error) {
                setError(error.response?.data?.error || "Error fetching lab tests");
            }
        };

        fetchLabTests();
    }, [technicianId]);

    const handleCreateReportClick = (test) => {
        setCurrentTest(test); 
    };

    const handleReportSaved = async () => {
        // Refresh the lab tests after saving the report
        try {
            const response = await axios.get(`http://localhost:5000/api/technician/labtests`);
            console.log(response.data); // Check what the response looks like

            setLabTests(response.data); // Update labTests with the fresh data
            
        } catch (error) {
            setError(error.response?.data?.error || "Error refreshing lab tests");
        }
        setCurrentTest(null); // Close the report form
    };

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto">
            <h1>{labTests.length} Lab Tests Available</h1>
            <h2 className="text-2xl font-semibold mb-4">Lab Tests</h2>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border">User ID</th>
                        <th className="border">Test Date</th>
                        <th className="border">Doctor</th>
                        <th className="border">Test Status</th>
                        <th className="border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { labTests.length > 0 ? (
                        labTests.map((test) => (
                            <tr key={test._id}>
                                <td className="border">{test.user_id}</td>
                                <td className="border">{new Date(test.date).toLocaleDateString()}</td>
                                <td className="border">{test.doctor_name}</td>
                                <td className="border">{test.status ? "Completed" : "Pending"}</td>
                                <td className="border">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleCreateReportClick(test)}
                                    >
                                        Create Report
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="border text-center">No lab tests available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Render the LabReportForm if a current test is selected */}
            {currentTest && (
                <div className="mt-4">
                    <h1>{currentTest._id}</h1>
                    <h3 className="text-xl font-semibold mb-2">Create Report for Test {currentTest._id}</h3>
                    <LabReportForm
                        technicianId={technicianId}
                        userId={currentTest.user_id} // Pass userId from the test
                        testId={currentTest._id}
                        onReportSaved={handleReportSaved} // Callback when report is saved
                    />
                </div>
            )}
        </div>
    );
};

export default TechnicianLabTests;
