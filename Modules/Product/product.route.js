const router = require("express").Router();
const { addProduct, updateProduct, getAllProducts, getProductsByID, getProductsByName, listProducts, deleteProduct } = require("./product.controller.js");

router.post("/products", addProduct);
router.put("/products/:productId", updateProduct);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductsByID);
router.get("/products/search", getProductsByName);
router.get("/products/list", listProducts);
router.delete("/products/:productId", deleteProduct);

module.exports = router;
