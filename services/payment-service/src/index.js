require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const amqlib = require("amqplib");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const RABBITMQ_URL = process.env.RABBITMQ_URL;

app.arguments(bodyParser.json());

// Create a payment intent
app.post("/create-payment", async (req, res) => {
  const { ammount, currency } = req.body;
  try {
    const pi = await stripe.paymentIntents.create({ ammount, currency });
    res.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Stripe webhook to publish events
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(err.message);
    }

    const conn = await amqplib.connect(RABBITMQ_URL);
    const ch = await conn.createChannel();
    const queue = "payments";
    await ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(event)));
    console.log("Event queued:", event.type);
    res.json({ received: true });
  }
);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Payment Service running on ${PORT}`));
