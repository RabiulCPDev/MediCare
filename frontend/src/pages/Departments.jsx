import { DepartmentGrid } from "../components/department/DepartmentGrid"

export const Departments = ()=>{
    return (
        <div>
            <div className="bg-gray-100 shadow-lg">
                <div className="mt-1">
                    <h1 className="text-4xl text-gray-900 font-semibold text-center">Our Departments</h1>
                </div>

                <div>
                <DepartmentGrid />
                </div>

            </div>
            
        </div>
    )
}