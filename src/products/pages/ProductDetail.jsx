import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductItemDetail } from "../components/ProductItemDetail";
import { productRoute } from "../../controllers";

export const ProductDetail = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);

  const handleGetProduct = async () => {
    try {
      // Replace with your API endpoint for fetching product data
      const response = await productRoute(`/${pid}`);
      setProduct(response.response);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    handleGetProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid]);

  return (
    <div className="w-full h-screen bg-[#144272] overflow-hidden">
      <ProductItemDetail {...product} />
    </div>
  );
};
