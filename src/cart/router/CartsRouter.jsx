import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { DetailCart } from "../pages/DetailCart";
import { Thanks } from "../pages/Thanks";

export const CartsRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DetailCart />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </>
  );
};
