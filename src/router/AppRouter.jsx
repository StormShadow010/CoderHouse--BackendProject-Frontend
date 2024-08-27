import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShowProductsPage } from "../products";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowProductsPage />} />
          {/* Add more routes here */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
