import { useEffect, useState } from "react";
import { DoctorCard } from "./DoctorCard";
import axios from "axios";

export const DoctorGrid = () => {
    const [doctor, setDoctor] = useState([]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/doctors');
            setDoctor(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-6 md:px-8 lg:px-14 my-3 justify-center">
            {doctor && doctor.length > 0 ? (
                doctor.map((doc, index) => (
                    <DoctorCard key={index} doctor={doc} />
                ))
            ) : (
                <h1 className="text-center col-span-full">Doctor not found</h1>
            )}
        </div>
    );
};
