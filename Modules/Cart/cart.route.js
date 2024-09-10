const router = require("express").Router();
const isAuth = require("../../middlewares/auth.js");

const {
  addToCart,
  showCart,
  deleteFromTheCart,
  updateCart,
} = require("./cart.controller.js");

router.post("/add", isAuth(), addToCart);
router.get("/show", isAuth(), showCart);
router.delete("/delete", isAuth(), deleteFromTheCart);
router.put("/update", isAuth(), updateCart);

module.exports = router;
