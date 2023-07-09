import Styles from "./ProductCard.module.css";

import { useNavigate, useParams } from "react-router-dom";

const getPrice = (price, discount) => {
  let discountPrice = (price * discount) / 100;
  return Math.abs(price - discountPrice).toFixed(2);
};

const truncate = (str) => {
  if (str.length > 20) {
    return str.slice(0, 51);
  } else {
    return str;
  }
};

function ProductCard({ imageUrls, description, price, discount,_id }) {

  const navigate = useNavigate();

  return (
    <div
      className={Styles.card_holder}
      onClick={() => navigate(`/product/${_id}`)}
    >
      <img src={imageUrls[0]} alt="Product" />
      <p>{truncate(description)}...</p>
      <h3>Rs {getPrice(price, discount)}</h3>
    </div>
  );
}

export default ProductCard;
