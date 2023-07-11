const express = require("express");

const { OrderModel } = require("../models/order.model");

const orderRoute = express.Router();

orderRoute.get("/", async (req, res) => {
  try {
    let orders = await OrderModel.find();
    res.json({
      success: false,
      result: orders,
    });
  } catch (err) {
    console.log("err In orderRoute catch", err);
    res.status(400).json({
      success: false,
      message: "something went wrong while fetching orders",
    });
  }
});

orderRoute.post("/add", async (req, res) => {
  const { productId, price, quantity, totalPrice, paid, deliveryDetails } =
    req.body;
  // console.log({productId,price,quantity,totalPrice,paid,deliveryDetails});
  try {
    let newOrder = new OrderModel({
      productId,
      price,
      quantity,
      totalPrice,
      paid,
      deliveryDetails,
    });
    let savedOrder = await newOrder.save();
    res.json({
      success: true,
      result: savedOrder,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
});

module.exports = { orderRoute };
