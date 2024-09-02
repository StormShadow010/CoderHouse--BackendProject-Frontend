import { useEffect, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { Link } from "react-router-dom";
import { productsGet, usersGet } from "../../controllers";
import { MenuProductsAdmin } from "../../ui/components/MenuProductsAdmin";

export const ShowProductsPage = () => {
  const [userSession, setUserSession] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      handleProducts(detailPage.page, responseUser.response);
    } catch (error) {
      console.error("Failed to fetch user session:", error);
      handleProducts(detailPage.page);
    } finally {
      setLoading(false);
    }
  };

  const handleProducts = async (page, userSessionData = null) => {
    const userId = userSessionData?._id ? userSessionData._id.toString() : "";
    const userRole = userSessionData?.role || "";

    try {
      const response = await productsGet(
        `/paginate?page=${page}&title=${detailPage.filter}`,
        {
          userId,
          userRole,
        }
      );
      setProducts(response.response);
      setDetailPage((prevState) => ({
        ...prevState,
        ...response.info,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
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
    }
  };

  useEffect(() => {
    handleSessionUser();
  }, []);

  if (loading) {
    return <p>Cargando...</p>; // O puedes utilizar un spinner u otro indicador de carga.
  }

  return (
    <div className="w-full h-full bg-[#144272]">
      {/* Mostrar el menú adicional solo si el rol es 1 o 2 */}
      <MenuProductsAdmin />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 xxl:grid-cols-4 w-full p-3">
        {products &&
          products.map((product) => (
            <ProductItem key={product._id} {...product} />
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
