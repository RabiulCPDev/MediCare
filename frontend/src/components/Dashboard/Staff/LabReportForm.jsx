import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const LabReportForm = ({ technicianId, userId, testId, onReportSaved }) => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the lab report with the test names when the form loads
    useEffect(() => {
        const fetchLabReport = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/technician/labtests/${testId}`);
                // Ensure 'test' is present in the response
                if (response.data.test) {
                    // Initialize tests with name and an empty result
                    const fetchedTests = response.data.test.map(test => ({ name: test, result: '' }));
                    setTests(fetchedTests);
                } else {
                    setError("No tests found.");
                }
            } catch (error) {
                console.error("Error fetching lab report:", error);
                setError("Failed to load lab report data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchLabReport();
    }, [testId]);

    // Handle the result change for each test
    const handleResultChange = (index, result) => {
        const updatedTests = [...tests];
        updatedTests[index].result = result; // Update the result for the test
        console.log(updatedTests + " UPDATED");
        setTests(updatedTests);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const reportData = {
            technician_id: technicianId,
            status: true,
            test: tests.map(t => `${t.name} - ${t.result}`), // Format as 'Test Name - Result'
        };

        try {
            await axios.put(`http://localhost:5000/api/technician/labtests/${testId}`, reportData);
            console.log(reportData)
            onReportSaved();
        } catch (error) {
            console.error("Error submitting lab report:", error);
            setError("Error submitting the lab report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="text-xl font-semibold mb-4">Complete Lab Report</h3>

            {tests.map((test, index) => (
                <div key={index} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {test.name} (Enter result):
                    </label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={test.result} // Show the result if it exists
                        onChange={(e) => handleResultChange(index, e.target.value)}
                        placeholder={`Enter result for ${test.name}`}
                        required
                        disabled={loading}
                        aria-label={`Result for ${test.name}`}
                    />
                </div>
            ))}

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Results'}
                </button>
            </div>
        </form>
    );
};
