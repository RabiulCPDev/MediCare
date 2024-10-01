export const PageCard = (props) => {
    return (
      <div className="w-full h-fit bg-gradient-to-r from-blue-100 via-slate-200 to-blue-100">
        <div className="flex justify-between">
          <div className="m-4 p-2 justify-center w-2/3">
            <h1 className="text-4xl font-semibold text-gray-800">
               { props.name }
            </h1>
              <div >
              <p className="text-justify mt-4 font-serif leading-relaxed tracking-wide text-lg ">
                { props.description }
            </p>
              </div>
          </div>
          <div className=" flex justify-center items-center m-2 p-2">
            <img
              className=" h-96 rounded-lg shadow"
              src={props.url}
              alt="not found"
            />
          </div>
        </div>
      </div>
    );
  };


  
  // className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
  