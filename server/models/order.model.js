const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paid: { type: Boolean, required: true },
  deliveryDetails: {
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    nearby: { type: String, required: true },
    pinCode: { type: Number, required: true },
    address: { type: String, required: true },
  },
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel,
};
