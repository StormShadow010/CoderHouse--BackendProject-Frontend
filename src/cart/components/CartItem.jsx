/* eslint-disable react/prop-types */
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle, FaTrash } from "react-icons/fa";
import { useState } from "react";
import {
  cartsDeleteProduct,
  cartsUpdateProductQuantity,
} from "../../controllers";

export const CartItem = ({ product, onQuantityChange }) => {
  const [productItem, setProduct] = useState({
    product_id: product.product_id,
    quantity: product.quantity,
  });

  const handlePlus = async () => {
    const newQuantity = productItem.quantity + 1;
    setProduct({ ...productItem, quantity: newQuantity });
    await cartsUpdateProductQuantity(product._id, newQuantity);
    onQuantityChange(); // Notifica a DetailCart que hubo un cambio
  };

  const handleMinus = async () => {
    if (productItem.quantity > 1) {
      const newQuantity = productItem.quantity - 1;
      setProduct({ ...productItem, quantity: newQuantity });
      await cartsUpdateProductQuantity(product._id, newQuantity);
      onQuantityChange(); // Notifica a DetailCart que hubo un cambio
    }
  };
  const handleDelete = async () => {
    await cartsDeleteProduct(product._id);
    onQuantityChange(); // Notifica a DetailCart que hubo un cambio
  };

  return (
    <div className="flex flex-col justify-center items-center rounded-lg bg-white shadow-md m-2 p-2">
      <div>
        <img
          className="w-[100px] h-[100px] object-cover"
          src={productItem.product_id.photo}
          alt={productItem.product_id.title}
        />
      </div>

      <div className="flex items-center justify-evenly">
        <h2 className="w-1/2 text-md font-bold text-gray-900">
          {productItem.product_id.title}
        </h2>
        <p className="w1/2 text-lg font-bold text-gray-900">
          ${(productItem.product_id.price * productItem.quantity).toFixed(2)}
        </p>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center">
        <div className="flex items-center border-gray-100">
          <button
            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            onClick={handlePlus}
          >
            <FaCirclePlus color="#000" size={22} />
          </button>
          <span className="h-8 w-8 flex items-center justify-center border bg-white text-center text-md outline-none">
            {productItem.quantity}
          </span>

          <button
            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            onClick={handleMinus}
          >
            <FaMinusCircle color="#000" size={22} />
          </button>
        </div>
        <div className="mt-2 ">
          <button className="" onClick={handleDelete}>
            <FaTrash color="red" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
