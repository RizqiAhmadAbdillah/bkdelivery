import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  lowerItemQuantity,
  increaseItemQuantity,
  closeCart,
  resetCart,
} from "../features/cartSlice";
import Button from "./Button";
import TrashSvg from "../assets/TrashSvg";
import CloseSvg from "../assets/CloseSvg";
import Swal from "sweetalert2";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.cart.items);

  const isCartEmpty = cart.totalProducts == 0;

  const clickHandler = async () => {
    const transactions = {
      charged_amount: cart.totalPrice,
    };
    try {
      const tr = await axios.post(
        "http://localhost:3000/transactions",
        transactions
      );
      for (let product of products) {
        const transaction_details = {
          product_id: product.id,
          transaction_id: tr.data.id,
          quantity: product.quantity,
          subtotal: product.quantity * product.price,
        };
        await axios.post(
          "http://localhost:3000/transaction_details",
          transaction_details
        );
      }
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your order has been saved",
        confirmButtonText: "Ok",
      });
      dispatch(resetCart());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please wait a moment while we fix the issue",
        confirmButtonText: "Ok",
      });
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        className={
          cart.isCartOpen
            ? "fixed flex flex-col gap-5 h-screen md:w-1/2 w-full top-0 right-0 bg-white z-50 drop-shadow-[0_100px_100px_rgba(0,0,0,0.2)]"
            : "hidden "
        }
      >
        <div className="cart__header p-4 flex justify-between sticky w-full top-0 bg-[#FFA559]/[.2] text-gray-950 capitalize z-50 border-b border-[#222]/[.2]">
          <h1 className="flex gap-4">
            <p className="text-3xl">cart</p>
            <div className="rounded-full bg-inherit border-2 border-[#222] flex justify-center items-center w-9 font-semibold">
              {cart.totalProducts}
            </div>
          </h1>
          <button
            onClick={() => dispatch(closeCart())}
            className="cursor-pointer px-1 rounded bg-red-500"
          >
            <CloseSvg />
          </button>
        </div>
        {isCartEmpty ? (
          <p className="flex justify-center items-center h-5/6 text-center text-lg">
            Cart is empty
          </p>
        ) : (
          <ul className="flex flex-col justify-start gap-4 overflow-x-hidden h-5/6 pb-8">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between p-2 gap-4 border-b border-b-gray-200"
              >
                <div
                  id="tr__wrapper"
                  className="flex justify-between items-center gap-4 w-full"
                >
                  <div
                    id="tr__remove"
                    onClick={() => dispatch(removeFromCart(item))}
                    className="p-4 rounded bg-red-500"
                  >
                    <TrashSvg />
                  </div>
                  <div className="flex flex-grow justify-between gap-4">
                    <div id="tr__image" className="w-1/6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full object-cover rounded-lg"
                      />
                    </div>
                    <div
                      id="tr_details"
                      className="flex flex-col justify-center flex-grow"
                    >
                      <div id="tr__name" className="font-semibold">
                        {item.name}
                      </div>
                      <div id="tr__price">
                        {"Rp." + item.price * item.quantity}
                      </div>
                    </div>
                    <div
                      id="tr__quantity"
                      className="flex justify-between items-center"
                    >
                      <button
                        onClick={() => dispatch(lowerItemQuantity(item))}
                        className="p-2 text-white w-8 bg-blue-500 rounded-l"
                      >
                        -
                      </button>
                      <div className="p-2 bg-gray-200 w-8 text-center">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => dispatch(increaseItemQuantity(item))}
                        className="p-2 text-white w-8 bg-blue-500 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-4 justify-between bg-[#FFA559]/[.2] text-gray-950 capitalize border-t border-t-gray-400 border-spacing-48 border-dashed">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Total:</h1>
              <p className="text-xl font-bold">{"Rp." + cart.totalPrice}</p>
            </div>
          </div>
          <Button
            text="Checkout"
            variant="primary"
            onClick={() => clickHandler()}
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
