import { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceForm = ({ serviceData, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        service_id: '',
        url: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (serviceData) {
            setFormData(serviceData);
        } else {
            setFormData({
                name: '',
                service_id: '',
                url: '',
                description: '',
            });
        }
    }, [serviceData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (serviceData && serviceData._id) {
                await axios.put(`http://localhost:5000/api/admin/services/${serviceData._id}`, formData);
                alert('Service updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/admin/services', formData);
                alert('Service created successfully.');
            }
            onSuccess(); // Call success handler after submission
        } catch (error) {
            setError('Error saving service data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label>Service Name:</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Service ID:</label>
                <input
                    type="text"
                    id="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>URL:</label>
                <input
                    type="text"
                    id="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded" disabled={loading}>
                    {serviceData && serviceData._id ? 'Update Service' : 'Create Service'}
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ServiceForm;
