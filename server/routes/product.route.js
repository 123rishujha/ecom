const express = require("express");
const { ProductModel } = require("../models/product.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const { search, category } = req.query;
  console.log("search", search);
  let searchObj = {};
  if (search) {
    searchObj = {
      $or: [
        { title: { $regex: search, $options: "i" } }, // using regex to find word or letter in string
        { description: { $regex: search, $options: "i" } },
      ],
    };
  }
  console.log("category", category);
  if (category && category.length > 0) {
    if (typeof category === "string") {
      // console.log("called 1");
      if (search) {
        searchObj = {
          $or: [...searchObj.$or, { category }],
        };
      } else {
        searchObj = { category };
      }
    } else {
      // console.log("called 2");

      let categoryArray = category.map((elem) => ({ category: elem }));

      if (search) {
        searchObj = {
          $or: [...categoryArray, ...searchObj.$or],
        };
      } else {
        searchObj = {
          $or: [...categoryArray],
        };
      }
    }
  }
  console.log("searchObj", searchObj);
  try {
    let products = await ProductModel.find(searchObj);
    res.status(200).json({
      success: true,
      result: products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "something went wrong while ",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await ProductModel.findById(id);
    if (product) {
      res.json({
        success: true,
        result: product,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "something went wrong while fetching single product",
    });
  }
});

module.exports = router;
