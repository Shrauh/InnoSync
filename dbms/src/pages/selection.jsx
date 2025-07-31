import { useNavigate } from "react-router-dom";

const Selection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Choose your role</h1>
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/home")}
            className="w-1/2 bg-green-500 text-white p-3 rounded hover:bg-green-600"
          >
            Student
          </button>
          <button
            onClick={() => navigate("/mentor")}
            className="w-1/2 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 ml-4"
          >
            Mentor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;
