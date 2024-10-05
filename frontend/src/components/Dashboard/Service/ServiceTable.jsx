
import { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceForm from './ServiceForm';

const ServiceTable = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/services');
            setServices(response.data);
        } catch (error) {
            setError('Error fetching service data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (serviceId) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/services/${serviceId}`);
                setServices(services.filter(service => service._id !== serviceId));
                alert('Service deleted successfully.');
            } catch (error) {
                alert('Error deleting service.');
            }
        }
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setShowForm(true);
    };

    const handleCreate = () => {
        setSelectedService(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedService(null);
        fetchServices();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Manage Services</h2>
            <button onClick={handleCreate} className="bg-green-500 text-white px-3 py-1 rounded mb-4">Create Service</button>
            
            {showForm ? (
                <ServiceForm serviceData={selectedService} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Service Name</th>
                            <th className="py-2 px-4 border">Service ID</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service._id}>
                                <td className="py-2 px-4 border">{service.name}</td>
                                <td className="py-2 px-4 border">{service.service_id}</td>
                                <td className="py-2 px-4 border">
                                    <button onClick={() => handleEdit(service)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(service._id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ServiceTable;
