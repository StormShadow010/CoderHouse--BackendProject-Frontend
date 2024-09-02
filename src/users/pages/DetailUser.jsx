import { useEffect, useState } from "react";
import { usersGet } from "../../controllers";

export const DetailUser = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    photo: false,
    role: "",
  });

  const handleUserOnline = async () => {
    const response = await usersGet();
    if (response.statusCode === 200) {
      setUserInfo({ ...response.response });
    } else {
      console.error("Error fetching user data");
    }
  };

  useEffect(() => {
    handleUserOnline();
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#144272]">
      <div className="max-w-xl  bg-white rounded-lg shadow-md p-5 mb-24">
        <img
          className="w-[20rem] h-[20rem] rounded-full mx-auto"
          src={userInfo?.photo ? userInfo?.photo : undefined}
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">
          Username:{userInfo?.username}
        </h2>
        <p className="text-center text-gray-600 mt-1">
          User type:
          {userInfo?.role === 0
            ? "Normal"
            : userInfo?.role === 1
            ? "Administrador"
            : "Premium"}
        </p>

        <div className="flex justify-center mt-5">
          <h2 className="text-blue-500 hover:text-blue-700 mx-3">
            Email: {userInfo?.email}
          </h2>
        </div>
      </div>
    </div>
  );
};
