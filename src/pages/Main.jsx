import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import PreviousSvg from "../assets/PreviousSvg";
import NextSvg from "../assets/NextSvg";
import { Link } from "react-router-dom";

function Main() {
  const [heroId, setHeroId] = useState(1);
  const next = () => {
    setHeroId((heroId) => heroId++);
    if (heroId === 4) {
      setHeroId(1);
    }
  };
  const previous = () => {
    setHeroId((heroId) => heroId--);
    if (heroId === 0) {
      setHeroId(1);
    }
  };
  const [promotions, setPromotions] = useState([]);
  const getPromotions = async () => {
    axios
      .get(`http://localhost:3000/promo`)
      .then((response) => setPromotions(response.data))
      .catch((error) => console.log(error.message));
  };
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getProducts();
    getPromotions();
  }, [heroId]);
  return (
    <div className="flex flex-col mb-8 gap-8">
      <img
        src="https://bkdelivery.co.id/media/slider_image/2023/8/22/lurmdumdrzou6jk2nnvxqd.jpg"
        alt="Hero"
      />
      {/* <div
        className={`w-full bg-[url('https://bkdelivery.co.id/media/slider_image/2023/8/22/lurmdumdrzou6jk2nnvxqd.jpg')]`}
      >
        <Button
          onClick={previous}
          variant="white"
          iconLeft={<PreviousSvg />}
          className="z-50"
        />
        <Button
          onClick={next}
          variant="white"
          iconLeft={<NextSvg />}
          className="z-50"
        />
      </div> */}
      <div className="lg:px-24 px-5 flex flex-col gap-8">
        <div id="promo" className="flex flex-col gap-4">
          <div id="promo__header" className="flex justify-between w-full">
            <h2 className="text-3xl font-bold">Fresh Promotions</h2>
            <p className="hidden lg:flex items-end underline">
              See all promotions
            </p>
          </div>
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {promotions.slice(0, 3).map((promo) => (
              <li key={promo.id}>
                <img src={promo.image} alt={promo.description} />
                <h2 className="text-lg font-semibold">{promo.name}</h2>
                <p>{promo.description}</p>
              </li>
            ))}
          </ul>
          <div className="lg:hidden">
            <Button variant="white" text="See all promotions" />
          </div>
        </div>
        <div id="products" className="flex flex-col gap-4">
          <div id="pproducts__header" className="flex justify-between w-full">
            <h2 className="text-3xl font-bold">Fresh Menus</h2>
            <Link to={"/products"}>
              <p className="hidden lg:flex items-end underline">
                See all menus
              </p>
            </Link>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((product) => (
              <li key={product.id}>
                <div className="bg-white p-2 rounded h-full w-fit">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover rounded"
                  />
                  <h2 className="font-bold">{product.name}</h2>
                  {/* <p className="text-sm">{`Rp. ${product.price}`}</p> */}
                </div>
              </li>
            ))}
          </ul>
          <div className="lg:hidden">
            <Link to={"/products"}>
              <Button variant="white" text="See all menus" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
