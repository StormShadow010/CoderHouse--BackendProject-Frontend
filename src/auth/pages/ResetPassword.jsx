import { useState } from "react";
import { Modal, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { authPost, authPut } from "../../controllers/auth.controller";
import { usersPost } from "../../controllers";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [formNewPassword, setFormNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmitPassword = async () => {
    if (formNewPassword) {
      const response = await authPut(`/password`, {
        email,
        password: passwords.password,
      });
      if (response.statusCode === 200) {
        Swal.fire({
          title: "Success",
          text: "Password has been reset successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          allowOutsideClick: false,
          timerProgressBar: true,
        }).then(() => {
          navigate(`/auth`);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "An error occurred while resetting the password.",
          icon: "error",
          confirmButtonText: "Try again",
        });
      }
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => {
      const newPasswords = { ...prevState, [name]: value };
      validatePasswords(newPasswords);
      return newPasswords;
    });
  };

  const validatePasswords = (passwords) => {
    if (passwords.password !== passwords.confirmPassword) {
      setValidationMessage("Passwords do not match");
      setIsButtonDisabled(true);
    } else {
      setValidationMessage("");
      setIsButtonDisabled(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleModalOk = async () => {
    const response = await usersPost(`/verifyCode`, {
      email,
      code: verificationCode,
    });
    if (response.statusCode === 200) {
      setIsModalOpen(false);
      setFormNewPassword(true);
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
    console.log("Modal cancel");
    setIsModalOpen(false);
  };

  const handleCode = async (e) => {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid email",
        icon: "error",
      });
      return;
    }

    const response = await authPost("/password", { email });
    if (response.statusCode === 200) {
      setIsModalOpen(true);
    } else {
      console.error("Error sending reset code");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#090F26] flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl lg:text-[5rem]">Reset Password</h1>
      <Link to="/">
        <img
          src="/assets/icons/homePage.png"
          alt="home Page"
          className="w-[100px] h-[100px] m-3"
        />
      </Link>
      <div className="w-[90%] flex flex-col items-center">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={formNewPassword}
          className="w-full h-[2.2rem] lg:h-[3.2rem] text-md lg:text-[3rem] xl:text-[2.2rem] xl:w-[60%] text-center border-b-2 bg-transparent outline-none placeholder:italic focus:outline-none"
        />
        <button
          id="emailResetButton"
          type="submit"
          onClick={handleCode}
          disabled={formNewPassword}
          className={`w-full lg:text-[3rem] xl:text-[2rem] mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${
            formNewPassword ? "hidden" : "block"
          }`}
        >
          Send Code
        </button>
      </div>
      {formNewPassword && (
        <div className="w-[90%] flex flex-col items-center focus-within:border-indigo-500 p-2">
          <p className="mb-2">
            <span className="font-bold">Password</span> and{" "}
            <span className="font-bold">Confirm</span> validation.
          </p>
          <div className="flex flex-col items-center justify-center space-y-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={passwords.password}
              onChange={handlePasswordChange}
              className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-center text-orange-500 italic text-sm">
              {validationMessage}
            </p>
            <button
              id="showPw"
              className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <button
              id="submitButton"
              className="rounded-full bg-green-500 p-2 px-4 text-white hover:bg-green-600 disabled:opacity-50"
              disabled={isButtonDisabled}
              onClick={handleSubmitPassword}
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
      <Modal
        title="Enter Verification Code"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Input
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </Modal>
    </div>
  );
};
