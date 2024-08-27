import { useEffect, useState } from "react";
import { getProductsAll } from "../../controllers/products.controller";

export const ShowProductsPage = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    getProductsAll().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      {/* {products &&
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      {/* {products && <p>Total products: {products.length}</p>}
    {products && <p>Page {detailPage.page}</p>}
    {products && <button onClick={() => handlePreviousPage()}>Previous</button>}
    {products && <button onClick={() => handleNextPage()}>Next</button>} */}
    </div>
  );
};
