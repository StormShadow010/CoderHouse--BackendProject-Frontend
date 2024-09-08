import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUser, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { BiSolidCartAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { usersGet, usersPost } from "../../controllers";
import Swal from "sweetalert2";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState({
    _id: "",
    username: "",
    email: "",
    photo: false,
    role: "",
  });

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await usersPost(`/signout`);

        if (response.statusCode === 200) {
          setIsLoggedIn(false);
          navigate("/");
        }
      }
    });
  };

  useEffect(() => {
    handleUserOnline();
  }, []);

  return (
    <header className="sticky top-0 bg-[#041C32] shadow-lg z-50 text-white w-full">
      <nav className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex justify-center items-center md:w-1/4">
            <Link to="/">
              <img
                src="/assets/images/logoStore.jpg"
                alt="Logo Store"
                className="h-[60px] w-[60px] md:h-[80px] md:w-[80px]"
              />
            </Link>
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0 justify-center md:w-1/4">
            {isLoggedIn ? (
              <>
                <Link to="/users/profile">
                  <FaUser color="white" size={24} />
                </Link>
                {userSession.role !== 1 && (
                  <Link to="/carts">
                    <BiSolidCartAlt color="white" size={24} />
                  </Link>
                )}
                {userSession.role === 1 && (
                  <Link to="/users/adminUsers">
                    <FaUserEdit color="white" size={24} />
                  </Link>
                )}
                <button
                  className="text-gray-700 focus:outline-none"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt color="white" size={24} />
                </button>
              </>
            ) : (
              <Link to="/auth/">
                <FaSignInAlt color="white" size={30} />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
