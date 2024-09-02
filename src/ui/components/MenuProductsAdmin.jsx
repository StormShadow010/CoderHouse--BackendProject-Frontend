import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usersGet } from "../../controllers";

export const MenuProductsAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState({
    _id: "",
    username: "",
    email: "",
    photo: false,
    role: "",
  });

  const handleUserOnline = async () => {
    const response = await usersGet("/");
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
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleUserOnline();
  }, []);

  return (
    <>
      {isLoggedIn && (
        <div className="fixed inset-y-0 left-0 flex items-center ml-2 z-30">
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <ul className="flex flex-col items-center">
              <li className="mb-2">
                <Link to="/products/createProduct">
                  <img
                    src="../../assets/icons/addProduct.png"
                    alt="Add Product Logo"
                    className="h-[70px] w-[70px]"
                  />
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/adminProducts">
                  <img
                    src="../../assets/icons/listProducts.png"
                    alt="List Products Logo"
                    className="h-[60px] w-[60px]"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
