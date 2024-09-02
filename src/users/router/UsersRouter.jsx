import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { DetailUser } from "../pages/detailUser";
import { AdminUser } from "../pages/AdminUser";

export const UsersRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<DetailUser />} />
        <Route path="/adminUsers" element={<AdminUser />} />
        {/* <Route path="/:pid" element={<ProductDetail />} /> */}
      </Routes>
    </>
  );
};
