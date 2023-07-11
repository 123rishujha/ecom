import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getSingleProducts } from "../redux/product/product.actions";
import { postCheckOut } from "../redux/checkout/checkout.actions";

import { useSelector, useDispatch } from "react-redux";

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const navigate = useNavigate();
  const singleProduct = useSelector(
    (store) => store.productReducer.singleProduct
  );
  const successe = useSelector((store) => store.productReducer.success);
  const dispatch = useDispatch();

  console.log("productId", productId, singleProduct);

  useEffect(() => {
    console.log("dispatch called");
    dispatch(getSingleProducts(productId));
    console.log("dispatch ended");
  }, []);

  /*
     productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paid: { type: Boolean, required: true },
  */

  const getPrice = (price, discount) => {
    let discountPrice = (price * discount) / 100;
    return Math.abs(price - discountPrice).toFixed(2);
  };

  const handleBuyNow = () => {
    let obj = {
      productId,
      price: getPrice(singleProduct?.price, singleProduct?.discount),
      quantity,
      title: singleProduct.title,
      image: singleProduct.imageUrls[0],
      // totalPrice: singleProduct.price * quantity,
    };
    let payload = [obj];
    console.log("payload going to checkout", payload);
    dispatch(postCheckOut(payload));
    navigate("/checkout");
  };

  return (
    <div>
      <h1>ProductDetails</h1>
      <div style={{ border: "1px solid red" }}>
        {singleProduct?.imageUrls?.length > 0 && (
          <img src={singleProduct.imageUrls[0]} />
        )}
        <p style={{ textAlign: "justify", margin: "auto", fontSize: "20px" }}>
          {singleProduct?.description}
        </p>
        <p style={{ textAlign: "justify", margin: "auto", fontSize: "20px" }}>
          Price: {getPrice(singleProduct?.price, singleProduct.discount)}
        </p>
        <button onClick={handleBuyNow}>Buy Now!</button>
      </div>
    </div>
  );
}

export default ProductDetails;
