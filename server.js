const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Modules/User/user.route.js");

const app = express();
const URL = "mongodb://localhost:27017/E-commerce";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/** Routes */
// app.use("/api", appRoute);
// app.use("/cart", cartRouts);
app.use("/user", userRoute);
mongoose
  .connect(URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("can not connect to your database", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// http://localhost:3000/mattress/getAllMattress
// http://localhost:3000/product/getAllProducts
// http://localhost:3000/blender/getAllBlenders
// http://localhost:3000/inBath/getAllBaths
// http://localhost:3000/candle/getAllCandles
// http://localhost:3000/pillow//getAllPillows
// http://localhost:3000/eMachine/getAllEMachiness
// http://localhost:3000/cookingtools/getAllCookings
// http://localhost:3000/coffee/getAllCoffees
// http://localhost:3000/stick/getAllStickVacs
// http://localhost:3000/cart/showCart
// http://localhost:3000/cart/updateCart
// http://localhost:3000/cart/addtocart
// http://localhost:3000/cart/deleteFromCart
// http://localhost:3000/api/getMail
// http://localhost:3000/api/signup
// http://localhost:3000/api/login
