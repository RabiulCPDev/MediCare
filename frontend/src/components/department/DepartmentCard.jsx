import { useNavigate } from "react-router-dom";


export const DepartmentCard =({departments})=>{
  const navigate =useNavigate();
  
  const ReadMore=()=>{
      navigate(`/departments/${departments._id}`,{state:{departments:departments}});
  }
  
  return (
    <div className="flex-col h-96 bg-white p-2 mt-2 w-96 items-center shadow-lg rounded-lg ">
      <div  className="">
        <img className=" w-full h-60 mx-auto rounded-lg mb-2 shadow-lg " src={departments.url} alt="Product Pciture" />
       
      </div>
     
      <div className="w-full flex flex-col items-center justify-center ">
      <p className=" mb-1 text-center">{departments.name}</p>
        <button
        onClick={ReadMore}
          className="mt-1  border bg-blue-400 rounded-lg p-3 justify-center "
        >
          Read More
        </button>
      </div>
    </div>
  );
}
