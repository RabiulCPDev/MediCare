import { useNavigate } from "react-router-dom";

export const DepartmentCard = ({ departments }) => {
  const navigate = useNavigate();

  const ReadMore = () => {
    navigate(`/departments/${departments._id}`, { state: { departments } });
  };

  return (
    <div className="flex flex-col h-auto bg-white p-4 mt-4 mx-auto w-full sm:w-80 md:w-96 lg:w-[400px] shadow-lg rounded-lg transition-transform duration-200 hover:shadow-xl hover:scale-105">
      <div>
        <img
          className="w-full h-48 sm:h-48 md:h-56 lg:h-64 mx-auto rounded-lg mb-2 shadow-lg object-cover"
          src={departments.url}
          alt="Department Picture"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="mb-1 text-center font-semibold text-lg sm:text-xl md:text-2xl">{departments.name}</p>

        <p className="text-center line-clamp-2">{departments.description}</p>

        <button
          onClick={ReadMore}
          className="mt-2 border bg-blue-400 text-white rounded-lg p-2 sm:p-3 transition duration-200 hover:bg-blue-500"
        >
          Read More
        </button>
      </div>
    </div>
  );
};
