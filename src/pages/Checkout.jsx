import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetCart, closeCart, openCart } from "../features/cartSlice";
import Button from "../components/Button";
import BackSvg from "../assets/BackSvg";
import Swal from "sweetalert2";
import axios from "axios";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  //   const isLoggedIn = useSelector((state) => state.auth.token !== "");
  const products = cart.items;
  const subTotal = cart.totalPrice;
  //   const userId = user.id;
  //   const transaction = { userId, subTotal };

  async function handleCheckout() {
    try {
      //   if (isLoggedIn) {
      const tr = await axios.post("http://localhost:3000/transactions", {
        total: cart.totalPrice,
      });
      for (let product of products) {
        const tr_details = { ...product, transactionId: tr.data.id };
        await axios.post(
          "http://localhost:3000/transaction_details",
          tr_details
        );
      }
      //   }
      await Swal.fire(
        "Success!",
        "Sit tight, your coffee is on its way!",
        "success"
      );
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please wait a moment while we fix the issue",
        confirmButtonText: "Ok",
      });
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(closeCart());
  }, []);
  return (
    <>
      <div className="main m-5 md:mx-24 md:my-10 flex flex-col gap-5 md:gap-10">
        <div className="main__header flex flex-col gap-5 md:gap-10">
          <div className="main__title">
            <h1 className="text-3xl">checkout</h1>
          </div>
        </div>
        <Link to={"/"}>
          <Button
            text="Return to cart"
            variant="white"
            iconLeft={<BackSvg />}
            className="text-xs px-4 py-2"
          />
        </Link>
        <div className="grid grid-cols-3">
          <div className="col-span-2 w-11/12">
            <div className="express__checkout">
              <div className="express__checkout__title text-xl">
                express checkout
              </div>
              <ul className="express__checkout__list px-2 py-5 flex justify-between border border-[#222]/[.1] rounded">
                <li className="px-10 py-3 bg-[#108ee9] rounded cursor-pointer">
                  <img
                    src="https://www.dana.id/_nuxt/img/dana-logo.fe46647.png"
                    alt="Dana"
                    className="h-5 w-24"
                  />
                </li>
                <li className="px-10 py-3 bg-[#5f33ba] rounded cursor-pointer">
                  <img
                    src="https://storage.googleapis.com/ovo-prd-fs-edu-blog-static/cerdasfinansial/f5807836-ovo-logo-putih.png"
                    border="0"
                    alt="PayPal Logo"
                    className="h-5 w-24"
                  />
                </li>
                <li className="px-10 py-3 bg-[#5a31f4] rounded cursor-pointer">
                  <img
                    src="./src/assets/img/shoppay.svg"
                    alt="ShopPay"
                    className="h-5 w-24"
                  />
                </li>
                <li className="px-10 py-3 bg-white rounded cursor-pointer">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg"
                    alt="Gopay"
                    className="h-5 w-24"
                  />
                </li>
              </ul>
            </div>
            <div className="line border border-[#222]/[.1] my-5"></div>
            <div className="checkout">
              <div className="checkout__address">
                <h1 className="text-xl">shipping address</h1>
                <ul className="flex flex-col gap-2">
                  <li>
                    <select
                      name=""
                      id=""
                      className="bg-inherit w-full p-3 border border-[#222]/[.2] rounded"
                      readOnly
                    >
                      <option value="united states">COUNTRY</option>
                    </select>
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="NAME"
                      className="bg-inherit w-full p-3 border border-[#222]/[.2] rounded"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="ADDRESS"
                      className="bg-inherit w-full p-3 border border-[#222]/[.2] rounded"
                    />
                  </li>
                  <li className="flex gap-2 justify-between">
                    <input
                      type="text"
                      placeholder="CITY"
                      className="bg-inherit w-full p-3 border border-[#222]/[.2] rounded"
                    />
                    <select
                      name=""
                      id=""
                      className="bg-inherit w-full p-3 border border-[#222]/[.2] rounded"
                      readOnly
                    >
                      <option value="united states">STATE</option>
                    </select>
                    <input
                      type="text"
                      placeholder="ZIP CODE"
                      className="bg-inherit w-full p-3 border border-[#222]/[.2] rounded"
                    />
                  </li>

                  <li>
                    <input
                      type="text"
                      placeholder="PHONE (OPTIONAL)"
                      className="bg-inherit w-full p-3 border border-[#222]/[.2] rounded"
                    />
                  </li>
                  {/* <li className="flex justify-between">
                    <Link to={"/"}>
                      <Button
                        text="Return to cart"
                        variant="white"
                        iconLeft={<BackSvg />}
                        classes="normal-case"
                      />
                    </Link>
                    <Button text="continue to shipping" variant="primary" />
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="cart">
            {cart.items.map((item) => (
              <div
                key={item?.id}
                className="flex gap-2 h-32 py-5 border-b border-b-[#222]/[.5] border-dotted"
              >
                <div className="product__img">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="h-full object-cover"
                  />
                </div>
                <div className="product__desc flex flex-col flex-grow gap-2 relative">
                  <p className="text-sm text-left">Name: {item?.name}</p>
                  <p className="text-sm text-left">
                    Quantity: {item?.quantity}
                  </p>
                  <p className="text-sm text-left">
                    Price: {"Rp." + item?.price}
                  </p>
                  <p className="absolute bottom-0 right-0 text-lg font-semibold">
                    Total: {"Rp." + item?.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col justify-evenly p-5 gap-5 border-t-2 border-[#222]/[.5] border-dotted bg-[#7e836d]/[.1] mt-2">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <h2 className="text-xl">items:</h2>
                  <p className="text-xl font-semibold">{cart.totalProducts}</p>
                </div>
                <div className="flex justify-between">
                  <h2 className="text-xl">total:</h2>
                  <p className="text-xl font-semibold">
                    {`Rp. ${cart.totalPrice}`}
                  </p>
                </div>
                <Button
                  text="check out"
                  variant="primary"
                  onClick={handleCheckout}
                  classes="rounded-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
