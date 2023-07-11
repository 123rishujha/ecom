require("dotenv").config();
const express = require("express");
const cors = require("cors");

//connection with mongodb database;
const { connection } = require("./connection");

//routes
const productRoute = require("./routes/product.route");
const { userRoute } = require("./routes/user.route");
const { authenticate } = require("./middleware/authenticate.middleware");
const { cartRoute } = require("./routes/cart.route");
const { orderRoute } = require("./routes/order.route");
const { checkoutRouter } = require("./routes/checkout.route");


const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use(authenticate);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/order",orderRoute);
app.use("/payment",checkoutRouter);

app.listen(8080, async () => {
  try {
    await connection();
    console.log("connected to database");
  } catch (err) {
    console.log("not connected with database err:", err);
  }
  console.log("server is running on port 8080");
});
