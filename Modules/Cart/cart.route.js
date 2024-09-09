const router = require("express").Router();
const { addToCart, showCart, deleteFromTheCart, updateCart } = require("./cart.controller.js");

router.post("/add", addToCart);
router.get("/show", showCart);
router.delete("/delete", deleteFromTheCart);
router.put("/update", updateCart);

module.exports = router;
