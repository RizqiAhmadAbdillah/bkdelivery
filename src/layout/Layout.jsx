import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import CartSvg from "../assets/CartSvg";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../features/cartSlice";
import Cart from "../components/Cart";

function Layout() {
  const dispatch = useDispatch();
  const totalProducts = useSelector((state) => state.cart.totalProducts);
  return (
    <div className="bg-[#FFA559]/[.2] text-gray-950 capitalize">
      <Header />
      <Outlet />
      <div
        onClick={() => dispatch(openCart())}
        className="fixed bottom-5 right-5 lg:bottom-24 lg:right-24 z-40"
      >
        <div className="relative">
          <Button
            iconLeft={<CartSvg />}
            className="shadow-2xl border-2 border-white px-4 py-4 rounded bg-blue-500"
          />
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#FF6000] border-2 border-white rounded-full -top-2 -right-2">
            {totalProducts}
          </div>
        </div>
      </div>
      <Cart />
      <Footer />
    </div>
  );
}

export default Layout;
