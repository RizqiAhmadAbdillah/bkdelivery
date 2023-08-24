import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import ProductDetail from "./pages/ProductDetail";
import Menus from "./pages/Menus";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Menus />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
