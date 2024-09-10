const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Categories = require("./Modules/Category/category.route.js");
const subCategories = require("./Modules/SubCategory/subCategory.route.js");
const Brand = require("./Modules/Brand/brand.route.js");
const Product = require("./Modules/Product/product.route.js");
const addRatingAndReview = require("./Modules/Rating/rating.route.js");
const cartRouts = require("./Modules/Cart/cart.route.js");
const Order = require("./Modules/Order/order.route.js");
const auth = require("./Modules/Auth/auth.routes.js");
const app = express();

const URL = "mongodb://localhost:27017/E-commerce";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
/** Routes */
app.use("/cart", cartRouts);
app.use("/order", Order);
app.use("/category", Categories);
app.use("/subcategory", subCategories);
app.use("/brand", Brand);
app.use("/product", Product);
app.use("/rate", addRatingAndReview);
app.use("/auth", auth);
app.all("*", (req, res, next) =>
  res.status(404).json({ message: "404 Not Found URL" })
);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(err["cause"] || 500).json({ message: err.message });
  }
});
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
