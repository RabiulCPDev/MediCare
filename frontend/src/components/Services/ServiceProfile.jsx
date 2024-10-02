import { useLocation } from "react-router-dom";

export const ServiceProfile = () => {
    const location = useLocation();
    const { services } = location.state || {};
    return (
        <div className="flex flex-col items-center">
            {services ? ( 
                <>
                    <h1 className="text-center m-1 p-4 text-4xl">
                        Welcome to {services.name} Service
                    </h1>
                    <div className="rounded-xl border-blue-500 max-w-md">
                        <img 
                            src={services.url} 
                            className="w-full rounded-xl" 
                            alt={`${services.name} services`}
                        />
                    </div>
                    <div className="p-4">
                        <h1 className="text-3xl text-justify">{services.name}</h1>
                    </div>
                    <div className="p-4">
                        <h1 className="text-3xl text-justify">{services.description}</h1>
                    </div>
                </>
            ) : (
                <h1 className="text-center text-2xl">Service data not found.</h1>
            )}
        </div>
    );
};
