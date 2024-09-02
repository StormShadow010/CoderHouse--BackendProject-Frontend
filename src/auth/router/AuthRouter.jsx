import { Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage, ResetPassword } from "../pages";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
    </Routes>
  );
};
