const router = require("express").Router();
const { deleteBrand, addBrand, updateBrand, getBrand } = require("../Brand/brand.controller.js");

router.post("/brands", addBrand);
router.put("/brands/:brandId", updateBrand);
router.delete("/brands/:brandId", deleteBrand);
router.get("/brands/:brandId", getBrand);

module.exports = router;
