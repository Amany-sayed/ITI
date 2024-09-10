const isAuth = require("../../middlewares/auth.js");
const router = require("express").Router();
const {
  deleteBrand,
  addBrand,
  updateBrand,
  getBrand,
} = require("../Brand/brand.controller.js");

router.post("/add", isAuth(), addBrand);
router.put("/update/:brandId", isAuth(), updateBrand);
router.delete("/delete/:brandId", isAuth(), deleteBrand);
router.get("/:brandId", isAuth(), getBrand);

module.exports = router;
