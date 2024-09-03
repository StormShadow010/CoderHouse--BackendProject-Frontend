import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { DetailCart } from "../pages/DetailCart";

export const CartsRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DetailCart />} />
      </Routes>
    </>
  );
};
