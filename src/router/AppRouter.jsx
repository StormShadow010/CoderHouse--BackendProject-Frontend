import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProductsRoutes } from "../products/router/ProductsRoutes";
import { AuthRouter } from "../auth/router/AuthRouter";
import { NotFoundPage } from "../ui/pages/NotFoundPage";
import { UsersRouter } from "../users/router/UsersRouter";
import { CartsRouter } from "../cart/router/CartsRouter";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="/products/*" element={<ProductsRoutes />} />
          <Route path="/users/*" element={<UsersRouter />} />
          <Route path="/carts/*" element={<CartsRouter />} />
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* <footer className="bg-red-500">Hello</footer> */}
      </BrowserRouter>
    </>
  );
};
