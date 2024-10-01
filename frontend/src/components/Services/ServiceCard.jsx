const cardImage = "https://firebasestorage.googleapis.com/v0/b/hospital-management-a0f47.appspot.com/o/Hospital%2FHospital.jpeg?alt=media&token=e00d7ea1-ac41-49e0-b154-5f2abe972d72";

export const ServiceCard =()=>{

  return (
    <div className="flex-col h-72 bg-white p-2 mt-2 w-80 items-center ">
      <div  className="">
        <img className=" w-full h-32 mx-auto rounded-lg mb-2 shadow-lg " src={cardImage} alt="Product Pciture" />
       
      </div>
     
      <div className="w-full flex flex-col items-center justify-center ">
          <p className=" mb-1 text-2xl text-center">24x7 Emergency Service</p>
            <button
              className="mt-4  border bg-blue-400 rounded-lg p-3 justify-center "
            >
              Read More
            </button>
      </div>
    </div>
  );
}
