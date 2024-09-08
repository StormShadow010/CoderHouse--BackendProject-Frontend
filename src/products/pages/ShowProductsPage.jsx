import { useEffect, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { productsGet, usersGet } from "../../controllers";
import { MenuProductsAdmin } from "../../ui/components/MenuProductsAdmin";

export const ShowProductsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userSession, setUserSession] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false); // Nuevo estado para manejar la carga de productos
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
    setLoadingProducts(true); // Inicia la carga de productos
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
    } finally {
      setLoadingProducts(false); // Finaliza la carga de productos
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

  const onHandleSearch = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setDetailPage((prevState) => ({
      ...prevState,
      page: 1,
      filter: newValue,
    }));
  };

  useEffect(() => {
    handleSessionUser();
  }, []);

  useEffect(() => {
    handleProducts(detailPage.page, userSession);
  }, [detailPage.page, detailPage.filter]); // Solo actualizamos productos si cambia `page` o `filter`

  return (
    <div className="w-full h-full bg-[#144272]">
      {/* Mostrar el menú adicional solo si el rol es 1 o 2 */}
      <MenuProductsAdmin />
      <div className="flex items-center justify-center w-full mt-4 md:mt-0">
        <div className="flex items-center justify-center w-full mx-auto bg-white rounded-lg md:w-1/2 m-4">
          <input
            type="search"
            className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
            placeholder="search"
            onChange={onHandleSearch}
            value={searchValue}
          />
          <button
            type="submit"
            className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {loadingProducts ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 xxl:grid-cols-4 w-full p-3">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              IDproduct={product._id}
              {...product}
            />
          ))}
        </div>
      )}

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
