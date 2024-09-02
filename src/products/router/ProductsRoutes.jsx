import { Navbar } from "../../ui/components/Navbar";
import { Route, Routes } from "react-router-dom";
import {
  CreateProduct,
  ShowProductsPage,
  ProductDetail,
  AdminProducts,
} from "../pages";

export const ProductsRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShowProductsPage />} />
        <Route path="/:pid" element={<ProductDetail />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/adminProducts" element={<AdminProducts />} />
      </Routes>
    </>
  );
};
