import { useLocation } from "react-router-dom";

export const DepartmentProfile = () => {
    const location = useLocation();
    const { departments } = location.state || {};

    return (
        <div className="flex flex-col items-center">
            {departments ? ( 
                <>
                    <h1 className="text-center m-1 p-4 text-4xl">
                        Welcome to {departments.name} departments
                    </h1>
                    <div className="rounded-xl border-blue-500 max-w-md">
                        <img 
                            src={departments.url} 
                            className="w-full rounded-xl" 
                            alt={`${departments.name} departments`}
                        />
                    </div>
                    <div className="p-4">
                        <h1 className="text-3xl text-justify">{departments.description}</h1>
                    </div>
                </>
            ) : (
                <h1 className="text-center text-2xl">Departments data not found.</h1>
            )}
        </div>
    );
};
