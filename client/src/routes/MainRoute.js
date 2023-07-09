import { Route, Routes } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<h1>Cart page</h1>} />
      </Routes>
    </div>
  );
};

export default MainRoute;
