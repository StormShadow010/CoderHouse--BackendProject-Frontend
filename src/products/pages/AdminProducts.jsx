import { useEffect, useState } from "react";
import { productsGet, usersGet } from "../../controllers";

import { ProductItemAdmin } from "../components/ProductItemAdmin";

export const AdminProducts = () => {
  const [userSession, setUserSession] = useState(null);
  const [products, setProducts] = useState([]);
  const [detailPage, setDetailPage] = useState({
    limit: 0,
    nextPage: null,
    page: 1,
    totalPages: null,
    prevPage: null,
    filter: "",
  });

  const handleSessionUser = async () => {
    try {
      let responseUser = await usersGet(`/`);
      setUserSession(responseUser.response);
      // Fetch products after user session is loaded
      handleProducts(detailPage.page, responseUser.response);
    } catch (error) {
      console.error("Failed to fetch user session:", error);
    }
  };
  const handleProducts = async (page, userSessionData = null) => {
    const userId = userSessionData._id.toString();
    const userRole = userSessionData.role;

    try {
      let responseProducts = await productsGet(`/me?page=${page}`, {
        userId,
        userRole,
      });
      setProducts(responseProducts.response);
      setDetailPage((prevState) => ({
        ...prevState,
        ...responseProducts.info,
      }));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleNextPage = () => {
    if (detailPage.nextPage) {
      const nextPage = detailPage.page + 1;
      setDetailPage((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      handleProducts(nextPage, userSession);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (detailPage.prevPage) {
      const prevPage = detailPage.page - 1;
      setDetailPage((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      handleProducts(prevPage, userSession);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleSessionUser();
  }, []);

  const handleQuantityChange = () => {
    handleSessionUser();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-[#144272] -pb-6">
      <h1 className="text-center text-2xl font-bold text-white">
        Admin Products
      </h1>
      {/* Product List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 xxl:grid-cols-4 w-full p-3">
        {products &&
          products.map((product) => (
            <ProductItemAdmin
              key={product._id}
              {...product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
      </div>
      {products && (
        <div className="flex justify-center">
          <button
            onClick={handlePrevPage}
            className={`p-2 rounded-full bg-blue-500 text-white hover:bg-blue-400 focus:outline-none focus:bg-blue-400 ${
              detailPage.prevPage === null ? "hidden" : ""
            }`}
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            className={`ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-400 focus:outline-none focus:bg-blue-400 ${
              detailPage.nextPage === null ? "hidden" : ""
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
