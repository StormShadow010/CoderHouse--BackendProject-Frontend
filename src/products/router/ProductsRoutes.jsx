import { Navbar } from "../../ui/components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { ShowProductsPage } from "../pages";
import { ProductDetail } from "../pages/ProductDetail";

export const ProductsRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="products" element={<ShowProductsPage />} />
        <Route path="product/:pid" element={<ProductDetail />} />
      </Routes>
    </>
  );
};
