import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Input } from "antd";
import Swal from "sweetalert2";
import { usersPost } from "../../controllers";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your API endpoint for registering new user

    const response = await usersPost(`register`, newUser);
    console.log(response);

    if (response.statusCode === 201) {
      setIsModalOpen(true);
    } else {
      Swal.fire({
        title: "Error",
        text: response.message,
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
  };

  const handleModalOk = async () => {
    // API endpoint for verifying Code
    const response = await usersPost(`verify`, {
      email: newUser.email,
      code: verificationCode,
    });
    if (response.statusCode === 200) {
      Swal.fire({
        title: "Registration successful!",
        text: "You can now log in with your credentials.",
        icon: "success",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsModalOpen(false);
          setNewUser({
            username: "",
            email: "",
            password: "",
            photo: "",
          });
          navigate(`/auth`);
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Verification code is incorrect.",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
  };
  const handleModalCancel = async () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Unregistered user",
      showConfirmButton: false,
      timer: 1500,
    });
    // API endpoint for verifying Code
    await usersPost(`verify`, {
      email: newUser.email,
      code: "",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-[#090F26]">
      <div className="flex flex-col items-center ">
        <Link to="/">
          <img
            src="/assets/icons/homePage.png"
            alt="home Page"
            className="w-[100px] h-[100px] m-3"
          />
        </Link>

        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium text-white">
            Register
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Name"
              name="username"
              id="username"
              autoComplete="off"
              required
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-white"
              onChange={handleInputChange}
              value={newUser.username}
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              autoComplete="off"
              required
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-white"
              onChange={handleInputChange}
              value={newUser.email}
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              autoComplete="off"
              required
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-white"
              onChange={handleInputChange}
              value={newUser.password}
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Photo(URL)"
              name="photo"
              id="photo"
              autoComplete="off"
              required
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-white"
              onChange={handleInputChange}
              value={newUser.photo}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="transform rounded-xl bg-indigo-600 py-2 px-4 font-bold duration-300 hover:bg-indigo-400 text-white"
              onClick={handleSubmit}
            >
              Create a new account
            </button>
          </div>
        </section>
      </div>
      {/* Modal para ingresar el código de verificación */}
      <Modal
        title="Verification Code"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Please enter the verification code sent to your email:</p>
        <Input
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          placeholder="Enter code"
        />
      </Modal>
    </div>
  );
};
