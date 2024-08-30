import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BiSolidCartAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { usersGet } from "../../controllers";

export const Navbar = () => {
  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para simular el inicio de sesión
  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const handleUserOnline = async () => {
    // API endpoint for verifying Code
    const response = await usersGet();

    if (response.statusCode === 200) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleUserOnline();
  }, []);

  return (
    <header className="sticky top-0 bg-[#041C32] shadow-lg z-50 text-white w-full">
      <nav className="container mx-auto flex items-center justify-evenly p-4">
        <div className="text-2xl font-bold">
          <Link to="/">
            <img
              src="/assets/images/logoStore.jpg"
              alt="Logo Store"
              className="h-[80px] w-[80px]"
            />
          </Link>
        </div>
        <div className="flex items-center max-w-md mx-auto bg-white rounded-lg ">
          <div>
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="search"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="flex space-x-6 mt-2 justify-around">
            <button
              className="text-gray-700 focus:outline-none"
              onClick={toggleLogin}
            >
              <Link to="/users/profile">
                <FaUser color="white" size={24} />
              </Link>
            </button>
            <button
              className="text-gray-700 focus:outline-none"
              // onClick={toggleProfile}
            >
              <BiSolidCartAlt color="white" size={24} />
            </button>
            <button
              className="text-gray-700 focus:outline-none"
              onClick={toggleLogin}
            >
              <FaSignOutAlt color="white" size={24} />
            </button>
          </div>
        ) : (
          <div className="flex space-x-6 mt-2 justify-end">
            <Link to="/auth/">
              <button className="text-gray-700 focus:outline-none">
                <FaSignInAlt size={30} />
              </button>
            </Link>
          </div>
        )}
        {/* <div className="flex space-x-6 mt-2 justify-center">
          <a href="#" className=" hover:text-blue-500">
            Inicio
          </a>
          <a href="#" className=" hover:text-blue-500">
            Servicios
          </a>
          <a href="#" className=" hover:text-blue-500">
            Contacto
          </a>
        </div> */}
        {/* <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div> */}
      </nav>
    </header>
  );
};
