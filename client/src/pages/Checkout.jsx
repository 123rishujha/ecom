import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Checkout = () => {
  const items = useSelector((store) => store.checkoutReducer.items);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    console.log("called frontend stripe");
    axios
      .post(
        "https://f4ln68-8080.csb.app/payment/stripe-payment",
        {
          items,
          userId: "83948123",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log("error in checkout", err);
      });
  };

  let totalAmount = 0;
  items.forEach((elem) => {
    console.log("elem", elem);
    totalAmount += Number(elem.price);
  });

  console.log("items checkout page", items);

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total Amount to Pay</p>
      <p>Rs {totalAmount}</p>
      <button onClick={handleCheckout}>checkout</button>
    </div>
  );
};

export default Checkout;
