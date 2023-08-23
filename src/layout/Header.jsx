import React from "react";
import Button from "../components/Button";
import MenuSvg from "../assets/MenuSvg";

function Header() {
  return (
    <div className="sticky top-0 left-0 z-10 py-4 px-5 lg:px-24 w-full flex justify-between items-center bg-[#454545] text-white">
      <div className="flex justify-start gap-16">
        <div className="flex items-center gap-4 font-bold text-lg">
          <div className="w-12 h-full">
            <img
              src="https://bkdelivery.co.id/static/website/img/logo_2022_x2.6bb6d972f0a5.png"
              alt="Burger King Delivery"
              className="object-cover"
            />
          </div>
          <p className="lg:hidden flex">Burger King</p>
        </div>
        <ul className="hidden lg:flex items-center gap-16 font-bold text-lg">
          <li>Order</li>
          <li>Promo</li>
          <li>Large Order</li>
        </ul>
      </div>
      <div className="hidden lg:flex">
        <Button variant="primary" text="LOGIN" />
      </div>
      <div className="flex lg:hidden">
        <Button variant="primary" iconLeft={<MenuSvg />} />
      </div>
    </div>
  );
}

export default Header;
