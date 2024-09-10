const router = require("express").Router();
const isAuth = require("../../middlewares/auth.js");

const {
  addProduct,
  updateProduct,
  getAllProducts,
  getProductsByID,
  getProductsByName,
  deleteProduct,
} = require("./product.controller.js");

router.post("/add", isAuth(), addProduct);
router.put("/update/:productId", isAuth(), updateProduct);
router.get("/all", isAuth(), getAllProducts);
router.get("/:productId", isAuth(), getProductsByID);
router.get("/search", isAuth(), getProductsByName);
router.delete("/delete/:productId", isAuth(), deleteProduct);

module.exports = router;
