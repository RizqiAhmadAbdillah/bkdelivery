import React from "react";
import Button from "../components/Button";
import FacebookSvg from "../assets/FacebookSvg";
import InstagramSvg from "../assets/InstagramSvg";
import TwitterSvg from "../assets/TwitterSvg";
import YoutubeSvg from "../assets/YoutubeSvg";
import CallSvg from "../assets/CallSvg";
import EmailSvg from "../assets/EmailSvg";
import ChatSvg from "../assets/ChatSvg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer bg-[#454545] text-white lg:px-24 px-5 py-6 normal-case">
      <div className="footer__top py-10 grid grid-cols-1 gap-8 lg:grid-cols-3 border-b-[0.08rem] border-b-white/[0.5] items-center">
        <div className="flex justify-center order-1 lg:justify-start lg:order-2">
          <div className="w-24 h-full">
            <Link to={"/"}>
              <img
                src="https://bkdelivery.co.id/static/website/img/logo_2022_x2.6bb6d972f0a5.png"
                alt="Burger King Delivery"
                className="object-cover"
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-center order-2">
          <ul className="flex justify-end gap-6">
            <li className="flex flex-column self-center">
              <FacebookSvg />
            </li>
            <li className="flex flex-column self-center">
              <InstagramSvg />
            </li>
            <li className="flex flex-column self-center">
              <TwitterSvg />
            </li>
            <li className="flex flex-column self-center">
              <YoutubeSvg />
            </li>
          </ul>
        </div>
        <div className="flex justify-end order-3">
          <Button variant="primary" text="Get promo code" />
        </div>
      </div>
      <div className="footer__mid py-10 border-b-[0.08rem] border-b-white/[0.5]">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="mid-2 flex flex-col gap-5 border-b-[0.08rem] border-b-white/[0.5] lg:border-none py-7 lg:p-0">
            <h1 className="font-semibold uppercase">contact us</h1>
            <ul className="flex flex-col gap-5">
              <li className="flex">
                <span className="mr-5">
                  <CallSvg />
                </span>
                <div>
                  <p>15000 25</p>
                </div>
              </li>
              <li className="flex">
                <span className="mr-5">
                  <EmailSvg />
                </span>
                <p>guestservice@burgerking.co.id</p>
              </li>
              <li className="flex">
                <span className="mr-5">
                  <ChatSvg />
                </span>
                <p className="underline">live chat here</p>
              </li>
            </ul>
          </div>
          <div className="mid-3 flex flex-col gap-5 border-b-[0.08rem] border-b-white/[0.5] lg:border-none py-7 lg:p-0">
            <h1 className="font-semibold uppercase">support</h1>
            <ul className="flex flex-col gap-3">
              <li className="capitalize">Order status</li>
              <li className="capitalize">delivery promo</li>
              <li className="capitalize">promo code</li>
              <li className="capitalize">frequently asked questions</li>
            </ul>
          </div>
          <div className="mid-3 flex flex-col gap-5">
            <h1 className="font-semibold uppercase">about burger king</h1>
            <ul className="flex flex-col gap-3">
              <li className="capitalize">story</li>
              <li className="capitalize">locations</li>
              <li className="capitalize">jobs</li>
              <li className="capitalize">blog</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bot py-10 text-sm">
        <div className="hidden xl:flex justify-between gap-10">
          <ul className="flex justify-start gap-10 capitalize">
            <p className="underline">Terms and Conditions</p>
            <p className="underline">accessibility statement</p>
            <p className="underline">privacy policy</p>
          </ul>
          <p>
            TM & © 2023 Burger King Corporation. Used Under License. All rights
            reserved.
          </p>
        </div>
        <div className="flex xl:hidden flex-col items-start">
          <ul className="flex flex-col items-start gap-5 py-2">
            <li className="border-b-[0.08rem] border-b-white">
              Terms and Conditions
            </li>
            <li className="border-b-[0.08rem] border-b-white">
              accessibility statement
            </li>
            <li className="border-b-[0.08rem] border-b-white">
              privacy policy
            </li>
            <li className="border-b-[0.08rem] border-b-white">
              do not sell or share my personal information
            </li>
            <li className="pb-3">
              TM & © 2023 Burger King Corporation. Used Under License. All
              rights reserved.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
