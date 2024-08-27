import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "./ui/components/Navbar";
import { useParams } from "react-router-dom";
import { getProductsAll } from "./controllers/products.controller";
import { AppRouter } from "./router/AppRouter";

export const EcommerceApp = () => {
  const [detailPage, setDetailPage] = useState({
    page: 1,
    filter: "",
  });

  const { hid } = useParams();

  const handleOnline = async () => {
    axios
      .get("http://localhost:8080/api/auth")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProducts = async () => {
    axios
      .get(
        `http://localhost:8080/api/products/paginate?page=${detailPage.page}&title=${detailPage.filter}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // handleOnline();
    handleProducts();
    getProductsAll();
  }, []);

  return (
    // <div className="flex flex-col min-h-screen bg-[#090F26]">
    //   <Navbar />
    //   <main className="container mx-auto p-4">
    //     <section className="">
    //       <h2 className="text-xl font-semibold">
    //         Bienvenido a nuestro sitio web
    //       </h2>
    //       <p className="mt-4 text-gray-700">
    //         Aquí puedes encontrar información sobre nuestros servicios.
    //       </p>
    //       {/* Más contenido aquí */}
    //       lorem*50
    //     </section>
    //   </main>
    // </div>
    <AppRouter />
  );
};
