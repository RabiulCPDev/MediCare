import { DepartmentCard } from './DepartmentCard';
export const DepartmentGrid = ()=>{
        return (
                <div className=" gap-2 grid grid-cols-4 px-14 my-3 justify-center ">
                       
                   <DepartmentCard />
                   <DepartmentCard/>
                   <DepartmentCard/>
                   <DepartmentCard/>
                   <DepartmentCard/>
                   <DepartmentCard/>
                   <DepartmentCard/>
                   <DepartmentCard/>
                   <DepartmentCard/>

                </div>
        )
}