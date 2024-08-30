import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { DetailUser } from "../pages/detailUser";

export const UsersRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<DetailUser />} />
        {/* <Route path="/:pid" element={<ProductDetail />} /> */}
      </Routes>
    </>
  );
};
