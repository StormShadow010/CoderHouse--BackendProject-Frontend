import { Navbar } from "../../ui/components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { ShowProductsPage } from "../pages";
import { ProductDetail } from "../pages/ProductDetail";

export const ProductsRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShowProductsPage />} />
        <Route path="/:pid" element={<ProductDetail />} />
      </Routes>
    </>
  );
};
