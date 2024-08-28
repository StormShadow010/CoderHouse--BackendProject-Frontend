import { useEffect, useState } from "react";
import axios from "axios";
import { ProductItem } from "../components/ProductItem";

export const ShowProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [detailPage, setDetailPage] = useState({
    limit: 0,
    nextPage: null,
    page: 1,
    totalPages: null,
    prevPage: null,
    filter: "",
  });

  const handleProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/paginate?page=${page}&title=${detailPage.filter}`
      );
      setProducts(response.data.response);
      setDetailPage((prevState) => ({
        ...prevState,
        ...response.data.info,
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
      handleProducts(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (detailPage.prevPage) {
      const prevPage = detailPage.page - 1;
      setDetailPage((prevState) => ({
        ...prevState,
        page: prevPage,
      }));
      handleProducts(prevPage);
    }
  };

  useEffect(() => {
    handleProducts(detailPage.page);
  }, [detailPage.page, detailPage.filter]);

  return (
    <div className="w-full h-full bg-[#144272]">
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
