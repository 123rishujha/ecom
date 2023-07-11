const express = require("express");
const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

checkoutRouter.post("/stripe-payment", async (req, res) => {
  console.log("called");
  const line_items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "IN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "INR",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "INR",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });
    res.send({ url: session.url });
  } catch (err) {
    console.log("error", err);
  }
});

//webhooks below
// This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret =
//   "whsec_6d36c8c2b78c7c1ed6a9522c3b60023d9b3c367f005c04be3e6e2b7cbe4990bf";

let endpointSecret;

checkoutRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    
    let data;
    let eventType;

    if(endpointSecret){
    let event;
      try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      conosle.log("Webhook Verified. working fine");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
      
      data = event.data.object;
      eventType = req.body.type;
    }
    else{
      data = req.body.data.object;
      eventType = req.body.type
    }
    
    //handle the event
    if(eventType === "checkout.session.compledted"){
      
    }
    

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

module.exports = {
  checkoutRouter,
};
