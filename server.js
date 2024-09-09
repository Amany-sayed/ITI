const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Modules/User/user.route.js");
const Categories = require("./Modules/Category/category.route.js");
const subCategories = require("./Modules/SubCategory/subCategory.route.js");
const Brand = require("./Modules/Brand/brand.route.js");
const Product = require("./Modules/Product/product.route.js");
const addRatingAndReview = require("./Modules/Rating/rating.route.js");
const cartRouts = require("./Modules/Cart/cart.route.js");
const Order = require("./Modules/Order/order.route.js");
const app = express();

const URL = "mongodb+srv://amany:uVPPJrUv66kKjXyG@cluster0.ptd1n.mongodb.net/Products";


dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/** Routes */
app.use("/cart", cartRouts);
app.use("/order", Order);
app.use("/category", Categories);
app.use("/subcategory", subCategories);
app.use("/brand", Brand);
app.use("/product", Product);
app.use("/rate", addRatingAndReview);
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
