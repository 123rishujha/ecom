import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListProducts from "../components/ListProducts/ListProducts";
import Pagination from "../components/Pagination/Pagination";


import {
  getProducts,
  getSingleProducts,
} from "../redux/product/product.actions";

const HomePage = () => {
  const products = useSelector((store) => store.productReducer.products);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("categories", categories);
  // console.log("products", products);

  useEffect(() => {
    dispatch(getProducts({ categories }));
  }, [categories]);

  const handlecategoryChange = useCallback((e, val) => {
    if (e.target.checked) {
      if (!categories.includes(val)) {
        setCategories((prev) => [...prev, val]);
        setCurrentPage(1);
      }
    } else {
      setCategories((prev) => prev.filter((elem) => elem != val));
      setCurrentPage(1);
    }
  }, []);

  const handleCurrentPage = (val) => {
    setCurrentPage(val);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            minWidth: "100px",
          }}
        >
          <h3>Categories</h3>
          <div>
            <input
              type="checkbox"
              id="electronics"
              onChange={(e) => handlecategoryChange(e, "electronics")}
            />
            <label htmlFor="electronics">electronics</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="fitness"
              onChange={(e) => handlecategoryChange(e, "fitness")}
            />
            <label htmlFor="fitness">fitness</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="furnitures"
              onChange={(e) => handlecategoryChange(e, "furnitures")}
            />
            <label htmlFor="furnitures">furnitures</label>
          </div>
        </div>
        <div
          style={{ width: "80%", margin: "auto", border: "1px solid green" }}
        >
          <ListProducts
            products={products}
            currentPage={currentPage}
            perPage={perPage}
          />
        </div>
      </div>
      <Pagination
        handleCurrentPage={handleCurrentPage}
        totalProductLength={products.length}
        perPage={perPage}
        currentPage={currentPage}
        siblingCount={2}
      />
    </div>
  );
};

export default HomePage;
