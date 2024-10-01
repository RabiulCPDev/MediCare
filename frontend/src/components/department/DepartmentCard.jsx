
const cardImage = "https://firebasestorage.googleapis.com/v0/b/hospital-management-a0f47.appspot.com/o/Hospital%2FDesigner%20(4).jpeg?alt=media&token=a14c1246-ea4a-402a-ae37-d8e5051ac5dd";

export const DepartmentCard =()=>{

  return (
    <div className="flex-col h-60 bg-white p-2 mt-2 w-60 items-center shadow-lg rounded-lg ">
      <div  className="">
        <img className=" w-full h-32 mx-auto rounded-lg mb-2 shadow-lg " src={cardImage} alt="Product Pciture" />
       
      </div>
     
      <div className="w-full flex flex-col items-center justify-center ">
      <p className=" mb-1 text-center">Anatomy</p>
        <button
          className="mt-1  border bg-blue-400 rounded-lg p-3 justify-center "
        >
          Larn More
        </button>
      </div>
    </div>
  );
}
