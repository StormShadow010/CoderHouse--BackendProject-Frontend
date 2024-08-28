import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsRoutes } from "../products/router/ProductsRoutes";
import { AuthRouter } from "../auth/router/AuthRouter";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login/*" element={<AuthRouter />} />
          <Route path="/*" element={<ProductsRoutes />} />
        </Routes>
        {/* <footer className="bg-red-500">Hello</footer> */}
      </BrowserRouter>
    </>
  );
};
