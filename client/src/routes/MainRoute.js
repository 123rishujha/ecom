import { Route, Routes } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import Checkout from "../pages/Checkout";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<h1>Cart page</h1>} />
        <Route path='/checkout-success' element={<h1>order placed successfully</h1>} />
      </Routes>
    </div>
  );
};

export default MainRoute;
