/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { cartsCreate, usersGet } from "../../controllers";

export const ProductItemDetail = ({
  _id,
  photo,
  price,
  title,
  category,
  supplier_id,
}) => {
  const [isUserSessionValid, setIsUserSessionValid] = useState(false);
  const [userSession, setUserSession] = useState({
    _id: "",
    username: "",
    email: "",
    photo: false,
    role: "",
  });
  const handleAddProduct = async () => {
    console.log(supplier_id._id);
    let data = {
      user_id: userSession._id,
      product_id: _id,
      supplier_id: supplier_id._id,
      quantity: 1,
    };
    const response = await cartsCreate(`/`, data);
    console.log(response);

    if (response.data.statusCode === 201) {
      Swal.fire({
        title: "Product added to cart",
        icon: "success",
        confirmButtonText: "Continue shopping",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: response.message,
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
  };

  const handleSession = async () => {
    try {
      const response = await usersGet(`/`);
      if (response.statusCode === 200) {
        setIsUserSessionValid(true);
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
      } else {
        setIsUserSessionValid(false);
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      setIsUserSessionValid(false);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  return (
    <>
      <div className="grid items-center">
        <div className="mx-auto my-10">
          <div className="bg-white shadow-md rounded-lg w-full dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-t-lg p-8 h-[500px] w-full"
              src={photo}
              alt={title}
            />
            <div className="px-5 pb-5">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                {category}
              </h3>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mt-2">
                {title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ${price}
                </span>
              </div>
              {isUserSessionValid && (
                <button
                  className="mt-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                  onClick={handleAddProduct}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
