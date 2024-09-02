import { useEffect, useState } from "react";
import { productDelete, usersGet } from "../../controllers";

/* eslint-disable react/prop-types */
export const ProductItemAdmin = ({
  _id,
  photo,
  price,
  title,
  onQuantityChange,
}) => {
  const [userSession, setUserSession] = useState({
    _id: "",
    username: "",
    email: "",
    photo: false,
    role: "",
  });
  const [isUserSessionValid, setIsUserSessionValid] = useState(false);

  const handleSession = async () => {
    try {
      const response = await usersGet(`/`);

      if (response.statusCode === 200) {
        setUserSession((prevState) => {
          const updatedFields = Object.keys(prevState).reduce((acc, key) => {
            if (key in response.response) {
              acc[key] = response.response[key];
            }
            return acc;
          }, {});

          return {
            ...prevState,
            ...updatedFields,
          };
        });
        setIsUserSessionValid(true);
      } else {
        setIsUserSessionValid(false);
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      setIsUserSessionValid(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    const response = await productDelete(`${id}`);
    if (response.statusCode === 200) {
      onQuantityChange();
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  return (
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
            {isUserSessionValid &&
              (userSession.role === 1 || userSession.role === 2) && (
                <button
                  className="block p-2 rounded-full bg-red-600 text-white mx-5 mb-2 hover:bg-red-500 hover:scale-125 focus:outline-none focus:bg-blue-500"
                  onClick={() => handleDeleteProduct(_id)}
                >
                  <svg
                    fill="#000000"
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    id="delete"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon multi-color"
                  >
                    <rect
                      id="secondary-fill"
                      x="6"
                      y="7"
                      width="9"
                      height="14"
                      style={{ fill: "rgb(44, 169, 188)", strokeWidth: 2 }}
                    />
                    <path
                      id="primary-stroke"
                      d="M4,7H20M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Z"
                      style={{
                        fill: "none",
                        stroke: "rgb(0, 0, 0)",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                  </svg>
                </button>
              )}
            {isUserSessionValid &&
              (userSession.role === 1 || userSession.role === 2) && (
                <button
                  className="block p-2 rounded-full bg-blue-600 text-white mx-5 mb-2 hover:bg-blue-500 hover:scale-125 focus:outline-none focus:bg-blue-500"
                  // onClick={() => handleEditProduct(_id)}
                >
                  <svg
                    fill="#000000"
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    id="update"
                    data-name="Line Color"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon line-color"
                  >
                    <path
                      id="primary"
                      d="M4,12A8,8,0,0,1,18.93,8"
                      style={{
                        fill: "none",
                        stroke: "rgb(0, 0, 0)",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    ></path>
                    <path
                      id="primary-2"
                      data-name="primary"
                      d="M20,12A8,8,0,0,1,5.07,16"
                      style={{
                        fill: "none",
                        stroke: "rgb(0, 0, 0)",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    ></path>
                    <polyline
                      id="secondary"
                      points="14 8 19 8 19 3"
                      style={{
                        fill: "none",
                        stroke: "rgb(44, 169, 188)",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    ></polyline>
                    <polyline
                      id="secondary-2"
                      data-name="secondary"
                      points="10 16 5 16 5 21"
                      style={{
                        fill: "none",
                        stroke: "rgb(44, 169, 188)",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    ></polyline>
                  </svg>
                </button>
              )}
            {/* {isUserSessionValid && userSession.role != 1 && (
              <button
                className="block p-2 rounded-full bg-blue-600 text-white mx-5 mb-2 hover:bg-blue-500 hover:scale-125 focus:outline-none focus:bg-blue-500"
                onClick={handleAddProduct}
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
