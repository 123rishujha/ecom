import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getSingleProducts } from "../redux/product/product.actions";

import { useSelector, useDispatch } from "react-redux";

function ProductDetails() {
  const { productId } = useParams();
  const singleProduct = useSelector(
    (store) => store.productReducer.singleProduct
  );
  const dispatch = useDispatch();

  console.log("productId", productId, singleProduct);

  useEffect(() => {
    dispatch(getSingleProducts(productId));
  }, [productId]);

  return (
    <div>
      <h1>ProductDetails</h1>
      <div style={{ border: "1px solid red" }}>
        <img src={singleProduct?.imageUrls[0]} />
        <p style={{ textAlign: "justify", margin: "auto", fontSize: "20px" }}>
          {singleProduct?.description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
