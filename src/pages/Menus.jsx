import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import SortDescSvg from "../assets/SortDescSvg";
import SortAscSvg from "../assets/SortAscSvg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, resetCategory, setCategory } from "../features/cartSlice";

function Menus() {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.cart.category);
  const options = ["Best Selling", "Name", "Newest", "Price"];
  const [sortBy, setSortBy] = useState(options[0]);
  const [keyword, setKeyword] = useState("");
  const [isDescending, setIsDescending] = useState(true);
  const evaluateParams = () => {
    const baseParams = {};
    if (isDescending) {
      baseParams._order = "desc";
    }
    if (keyword) {
      baseParams.q = keyword;
    }
    if (sortBy) {
      switch (sortBy) {
        case "Best Selling": {
          baseParams._sort = "id";
          break;
        }
        case "Name": {
          baseParams._sort = "name";
          break;
        }
        case "Newest": {
          baseParams._sort = "id";
          break;
        }
        case "Price": {
          baseParams._sort = "price";
        }
        default:
          break;
      }
    }
    if (categoryState !== 0) {
      baseParams.categoryId = categoryState;
    }
    return baseParams;
  };
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const params = evaluateParams();
    axios
      .get("http://localhost:3000/products", { params })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error.message));
  };
  const [productsByCategoryId, setProductsByCategoryId] = useState([]);
  const getProductsByCategoryId = async () => {
    await axios
      .get(`http://localhost:3000/categories?_embed=products`)
      .then((response) => {
        setProductsByCategoryId(response.data);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getProducts();
    getProductsByCategoryId();
  }, [sortBy, keyword, isDescending, categoryState]);
  return (
    <div className="lg:px-24 px-5 py-8 flex flex-col gap-8">
      <div id="products" className="flex flex-col gap-4">
        <div id="products__header" className="flex justify-between w-full">
          <h2 className="text-3xl font-bold">Fresh Menus</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3">
          <div className="grid grid-cols-2 gap-4">
            <select
              name=""
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 w-full bg-[#FF6000] rounded text-white font-semibold"
            >
              {options.map((value) => (
                <option
                  key={value}
                  value={value}
                  className="bg-white text-gray-950"
                >
                  {value}
                </option>
              ))}
            </select>
            <Button
              variant="blue"
              text={isDescending ? "Descending" : "Ascending"}
              iconLeft={isDescending ? <SortDescSvg /> : <SortAscSvg />}
              onClick={() => setIsDescending(!isDescending)}
              className="text-sm max-h-12"
            />
          </div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
            className="px-4 py-2 w-full rounded placeholder:italic"
          />
        </div>
        <div className="flex justify-between gap-10 overflow-auto">
          <button
            onClick={() => dispatch(resetCategory())}
            className={`font-bold text-lg outline-none border-b-2 ${
              categoryState === 0
                ? "border-b-gray-950"
                : "border-b-[#FFA559]/[0]"
            }`}
          >
            All (15)
          </button>
          {productsByCategoryId.map((category) => (
            <button
              key={category.id}
              onClick={() => dispatch(setCategory(category.id))}
              className={`font-bold text-lg outline-none border-b-2 ${
                categoryState === category.id
                  ? "border-b-gray-950"
                  : "border-b-[#FFA559]/[0]"
              }`}
            >
              {category.name} ({category.products.length})
            </button>
          ))}
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <div className="flex flex-col justify-between gap-2 bg-white p-2 rounded h-full w-fit">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded"
                />
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-sm">{`Rp. ${product.price}`}</p>
                <Button
                  variant="primary"
                  text="Add to cart"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        ...product,
                        quantity: 1,
                      })
                    )
                  }
                  className="text-sm py-3"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menus;
