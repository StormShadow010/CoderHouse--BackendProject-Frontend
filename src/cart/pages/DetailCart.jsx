import { useEffect, useState } from "react";
import { cartsGet, usersGet } from "../../controllers";
import { Subtotal } from "../components/Subtotal";
import { ticketsGet } from "../../controllers/tickets.controller";
import { CartItem } from "../components/CartItem";

export const DetailCart = () => {
  const [userSession, setUserSession] = useState("");
  const [totalCart, setTotalCart] = useState({
    subTotal: 0,
    total: 0,
  });
  const [cartsProducts, setCartsProducts] = useState([]);

  const getCartProducts = async () => {
    try {
      let responseUser = await usersGet(`/`);

      if (responseUser.statusCode == 200 && responseUser.response._id) {
        setUserSession(responseUser);

        let responseCart = await cartsGet(`/?uid=${responseUser.response._id}`);
        setCartsProducts(responseCart.response);
      } else {
        console.error("Invalid responseUser structure:", responseUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTotal = async () => {
    try {
      let responseUser = await usersGet(`/`);
      let responseTotal = await ticketsGet(`/${responseUser.response._id}`);

      if (responseTotal.response.length === 0) {
        setTotalCart({
          subTotal: 0,
          total: 0,
        });
        return;
      }

      setTotalCart({
        subTotal: responseTotal.response[0].subTotal,
        total: responseTotal.response[0].total,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    if (cartsProducts.length > 0) {
      handleTotal();
    }
  }, [cartsProducts]);

  const handleQuantityChange = () => {
    getCartProducts(); // Refresca todos los productos del carrito al cambiar la cantidad
    handleTotal(); // Calcula el nuevo total del carrito al cambiar la cantidad de un producto
  };

  return (
    <div className="w-full min-h-screen bg-[#144272]">
      <h1 className="text-center text-2xl font-bold text-white">Cart Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-2 md:order-1 rounded-lg p-4">
          <h2 className="text-lg font-bold text-white flex flex-col items-center">
            Items (total): {cartsProducts.length}
          </h2>
          {cartsProducts?.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className="order-1 md:order-2 rounded-lg p-4">
          <h2 className="text-lg font-bold text-white flex flex-col items-center">
            Total Cart
          </h2>
          <Subtotal
            totalCart={totalCart}
            userSession={userSession}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </div>
    </div>
  );
};
