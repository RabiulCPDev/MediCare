import { useState } from 'react';
import axios from 'axios';

export const LabReportForm = ({ setShowForm, user }) => {
  const [formData, setFormData] = useState({
    doctor_name: '',
    user_id: user._id,
    technician_id: '',
    test: [''],  
    date: new Date(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestChange = (e, index) => {
    const updatedTests = [...formData.test];
    updatedTests[index] = e.target.value;
    setFormData({ ...formData, test: updatedTests });
  };

  const addTestField = () => {
    setFormData({ ...formData, test: [...formData.test, ''] });
  };

  const removeTestField = (index) => {
    const updatedTests = formData.test.filter((_, i) => i !== index);
    setFormData({ ...formData, test: updatedTests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/labreports', formData);
      alert('Lab report submitted successfully');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting lab report', error);
      alert('Failed to submit lab report');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Lab Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="doctor_name" className="block text-sm font-medium">Ref: Doctor Name</label>
          <input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-sm font-medium">Tests</label>
          {formData.test.map((test, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="test"
                value={test}
                onChange={(e) => handleTestChange(e, index)}
                className="mt-1 p-2 block w-full border rounded"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTestField(index)}
                  className="ml-2 p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTestField}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Add Test
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date.toISOString().split('T')[0]}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Submit Lab Report
        </button>
      </form>
    </div>
  );
};
