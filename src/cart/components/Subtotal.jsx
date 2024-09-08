/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
import { cartsDeleteProduct } from "../../controllers";
import {
  ticketCheckoutPost,
  ticketsPost,
} from "../../controllers/tickets.controller";
import { useNavigate } from "react-router-dom";

export const Subtotal = ({ totalCart, userSession, onQuantityChange }) => {
  const navigate = useNavigate();
  const handleTicket = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to buy what you want?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await ticketsPost(`${userSession.response._id}`);
        if (response.statusCode === 200) {
          Swal.fire({
            title: "Ticket generated!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
            timerProgressBar: true,
          }).then(async () => {
            const compra = await ticketCheckoutPost(userSession.response._id);
            console.log(compra);

            window.location.href = `${compra.response.url}`;
            await cartsDeleteProduct(`/all/${userSession.response._id}`);
            onQuantityChange();
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to generate ticket",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false,
            timerProgressBar: true,
          });
        }
      }
    });
  };
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to clear your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cartsDeleteProduct(`/all/${userSession.response._id}`);

        onQuantityChange();
      }
    });
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-xl m-2">
      <div className="mb-2 flex justify-between">
        <strong className="text-gray-700">Subtotal</strong>
        <p id="subtotal" className="text-gray-700">
          ${totalCart.subTotal}
        </p>
      </div>
      <div className="flex justify-between">
        <strong className="text-gray-700">Shipping</strong>
        <p className="text-gray-700">$2.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p id="total" className="mb-1 text-lg font-bold">
            ${totalCart.total} USD
          </p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <button
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        onClick={handleTicket}
      >
        Check out
      </button>
      <button
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 flex justify-center items-center mx-auto"
        onClick={handleClearCart}
      >
        Clear Shopping Cart
      </button>
    </div>
  );
};
