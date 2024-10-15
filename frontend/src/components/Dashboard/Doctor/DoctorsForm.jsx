import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageDownloader from '../../imageUpload/ImageUploader'; 

const DoctorsForm = ({ doctor, onSuccess, onCancel }) => {
    const [doctorData, setDoctorData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: '',
        specialization: '',
        license_number: '',
        years_of_experience: '',
        qualifications: [],
        consultation_fee: '',
        department: '',
        room_number: '',
        address: '',
        joining_date: '',
        employee_id: '',
        description: '',
        shift_time: '',
        url: '', // We'll use this to store the uploaded image URL
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (doctor) {
            setDoctorData(doctor);
        }
    }, [doctor]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDoctorData({ ...doctorData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (doctor) {
                await axios.put(`http://localhost:5000/api/admin/doctors/${doctor._id}`, doctorData);
                alert('Doctor updated successfully.');
            } else {
                await axios.post('http://localhost:5000/api/admin/doctor', doctorData);
                alert('Doctor created successfully.');
            }
            onSuccess();
        } catch (error) {
            setError('Error saving doctor data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (url) => {
        setDoctorData({ ...doctorData, url });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* First Name */}
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    id="fname"
                    value={doctorData.fname}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Last Name */}
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    id="lname"
                    value={doctorData.lname}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Email */}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    id="email"
                    value={doctorData.email}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Phone */}
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    id="phone"
                    value={doctorData.phone}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Gender */}
            <div>
                <label>Gender:</label>
                <select
                    id="gender"
                    value={doctorData.gender}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* Specialization */}
            <div>
                <label>Specialization:</label>
                <input
                    type="text"
                    id="specialization"
                    value={doctorData.specialization}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* License Number */}
            <div>
                <label>License Number:</label>
                <input
                    type="text"
                    id="license_number"
                    value={doctorData.license_number}
                    onChange={handleChange}
                    required
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Years of Experience */}
            <div>
                <label>Years of Experience:</label>
                <input
                    type="number"
                    id="years_of_experience"
                    value={doctorData.years_of_experience}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Qualifications */}
            <div>
                <label>Qualifications (comma-separated):</label>
                <input
                    type="text"
                    id="qualifications"
                    value={doctorData.qualifications.join(', ')}
                    onChange={(e) => handleChange({ target: { id: 'qualifications', value: e.target.value.split(', ') } })}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Consultation Fee */}
            <div>
                <label>Consultation Fee:</label>
                <input
                    type="number"
                    id="consultation_fee"
                    value={doctorData.consultation_fee}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Department */}
            <div>
                <label>Department:</label>
                <input
                    type="text"
                    id="department"
                    value={doctorData.department}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Room Number */}
            <div>
                <label>Room Number:</label>
                <input
                    type="text"
                    id="room_number"
                    value={doctorData.room_number}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Address */}
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    id="address"
                    value={doctorData.address}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Joining Date */}
            <div>
                <label>Joining Date:</label>
                <input
                    type="date"
                    id="joining_date"
                    value={doctorData.joining_date.slice(0, 10)} 
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Employee ID */}
            <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    id="employee_id"
                    value={doctorData.employee_id}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Description */}
            <div>
                <label>Description:</label>
                <textarea
                    id="description"
                    value={doctorData.description}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Shift Time */}
            <div>
                <label>Shift Time:</label>
                <input
                    type="text"
                    id="shift_time"
                    value={doctorData.shift_time}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>

            {/* Profile Image Upload */}
            <div>
                <label>Profile Image:</label>
                <ImageDownloader onUploadSuccess={handleImageUpload} />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded" disabled={loading}>
                    {doctor ? 'Update Doctor' : 'Create Doctor'}
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default DoctorsForm;
