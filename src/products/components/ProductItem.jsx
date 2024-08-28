import { useNavigate } from "react-router-dom";
import { usersGet } from "../../controllers";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const ProductItem = ({ _id, photo, price, title }) => {
  const [userSession, setUserSession] = useState(false);

  const navigate = useNavigate();

  const handleDetailProduct = () => {
    navigate(`/product/${_id}`);
  };

  const handleSession = async () => {
    const response = await usersGet(`/`);
    if (response.statusCode === 200) {
      setUserSession(true);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  return (
    <>
      <div className="mx-auto px-5">
        <div className="max-w-xs cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md w-[350px] flex flex-col items-center">
          <img
            className="rounded-lg object-cover object-center h-[250px] w-full"
            src={photo}
            alt={title}
          />
          <p className="my-4 font-bold text-gray-500 text-center w-full">
            {title}
          </p>
          <div className="w-full flex flex-col justify-center items-center">
            <span className="ml-4"></span>
            <p className="mb-2 mr-2 text-xl font-semibold text-gray-800 text-right">
              ${price}
            </p>
            <div className="w-full flex items-center justify-evenly">
              <button
                className={`p-2 rounded-full bg-blue-600 text-white mx-5 mb-2 hover:bg-blue-500 hover:scale-125 focus:outline-none focus:bg-blue-500 ${
                  userSession ? "block" : "hidden"
                }`}
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button>
              <button
                className="p-2 rounded-full bg-white text-white mx-0 mb-2 hover:bg-yellow-300 hover:scale-125 focus:outline-none focus:bg-blue-500"
                onClick={handleDetailProduct}
              >
                <svg
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.95043 20.6471C6.17301 19.9956 4.00437 17.827 3.35287 15.0496C2.88237 13.0437 2.88237 10.9563 3.35287 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35287C17.827 4.00437 19.9956 6.173 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95043 20.6471Z"
                    stroke="#0095FF"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8.95043 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.173 17.827 4.00437 15.0496 3.35288C13.0437 2.88237 10.9563 2.88237 8.95043 3.35288C6.173 4.00437 4.00437 6.17301 3.35287 8.95043"
                    stroke="#363853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 15.5V11.5"
                    stroke="#0095FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="0.5"
                    stroke="#0095FF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
