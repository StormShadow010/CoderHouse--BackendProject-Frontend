import { useEffect, useState } from "react";
import { getProductsAll } from "../../controllers/products.controller";
import axios from "axios";
import { ProductItem } from "../components/ProductItem";

export const ShowProductsPage = () => {
  const [products, setProducts] = useState();
  const [detailPage, setDetailPage] = useState({
    page: 1,
    filter: "",
  });

  const handleProducts = async () => {
    const promise = await axios.get(
      `http://localhost:8080/api/products/paginate?page=${detailPage.page}&title=${detailPage.filter}`
    );
    setProducts(promise.data.response);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-3">
        {products &&
          products.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
      </div>
    </div>
  );
};
