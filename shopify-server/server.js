require('dotenv').config();
const cors = require("cors");
const express = require("express");

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


//add config
const stripe = require("stripe")(process.env.STRIPE_KEYS);

const app = express();

const PORT = 5000 || process.env.PORT;

//middleware..
server.use(middlewares);
server.use(router);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Shopify App..");
});

app.post("/payment", (req, res) => {
  const { cartItem, token } = req.body;
  console.log("Product:", cartItem);
});

app.listen(PORT, () =>
  console.log("Server is Running on PORT Number is " + PORT)
);
