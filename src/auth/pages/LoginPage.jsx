import { useState } from "react";
import { Modal, Input } from "antd";
import Swal from "sweetalert2";
import { usersPost } from "../../controllers";

export const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // API endpoint for login
    const response = await usersPost(`login`, {
      email: user.email,
      password: user.password,
    });
    if (response.statusCode === 200) {
      setIsModalOpen(true);
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleModalOk = async () => {
    // API endpoint for verifying Code
    const response = await usersPost(`verifyLogin`, {
      email: user.email,
      password: user.password,
      code: verificationCode,
    });
    if (response.statusCode === 200) {
      Swal.fire({
        title: "Login successful",
        width: 300,
        padding: "0.2em",
        color: "#00FF00",
        imageUrl:
          "https://static.vecteezy.com/system/resources/previews/005/163/927/original/login-success-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg",
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: "Login successful",
        allowOutsideClick: false,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        setIsModalOpen(false);
      });
    } else {
      Swal.fire({
        title: response.message,
        width: 300,
        padding: "0.2em",
        color: "#FF0000",
        imageUrl:
          "https://cdn-icons-png.freepik.com/256/12083/12083237.png?semt=ais_hybrid",
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: "Login failed",
        allowOutsideClick: false,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#090F26] flex flex-col justify-center items-center text-white">
      <a href="../../index.html">
        <img
          src="/assets/icons/homePage.png"
          alt="home Page"
          className="w-[100px] h-[100px] m-3"
        />
      </a>
      <section className="flex w-[18rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          onClick={handleLogin}
        >
          LOG IN
        </button>
        <a
          href="../users/resetPassword.html"
          className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
        >
          FORGOT PASSWORD?
        </a>
        <p className="text-center text-lg">
          No account?
          <a
            href="../users/register.html"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Create One
          </a>
        </p>
      </section>

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
