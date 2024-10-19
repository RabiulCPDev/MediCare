import { useState } from 'react';
import axios from 'axios';
import { GenerateAndUploadPDF } from '../Pdf/GenerateAndUploadPDF';

export const PrescriptionForm = ({ userId, doctorId, appointmentId, onPrescriptionSaved }) => {
    const [medicines, setMedicines] = useState([{ medicineDetail: '' }]);

    const handleMedicineChange = (index, value) => {
        const updatedMedicines = [...medicines];
        updatedMedicines[index].medicineDetail = value;
        setMedicines(updatedMedicines);
    };

    const addMedicineField = () => {
        setMedicines([...medicines, { medicineDetail: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const medicinesDetails = medicines.map(m => m.medicineDetail);
    
            
            const pdfUrl = await GenerateAndUploadPDF({ doctorId, userId, medicines: medicinesDetails });
    
           if(pdfUrl){
                await axios.post(`http://localhost:5000/api/doctor/prescriptions`, {
                    user_id: userId,
                    doctor_id: doctorId,
                    appointment_id: appointmentId,
                    medicines: medicinesDetails, 
                    pre_url: pdfUrl,  
                });
           }
            console.log(pdfUrl);
            alert("Prescription saved!");
    
            setMedicines([{ medicineDetail: '' }]); 
            onPrescriptionSaved(appointmentId); 
    
        } catch (error) {
            console.error("Error saving prescription:", error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2 className='text-2xl '>Prescription</h2>

            {medicines.map((prescription, index) => (
                <div key={index} className="medicine-entry rounded-md">
                    <input
                        type="text"
                        placeholder="Medicine and dosage (e.g. Aspirin 500mg)"
                        value={prescription.medicineDetail}
                        onChange={(e) => handleMedicineChange(index, e.target.value)}
                        required
                    />
                </div>
            ))}

            <button type="button" className='bg-green-300 p-3 m-1 rounded-lg shadow-sm' onClick={addMedicineField}>
                Add Medicine
            </button>

            <button className='p-2 bg-blue-500 p-3 m-1 rounded-lg' type="submit">Save Prescription</button>
        </form>
    );
};
