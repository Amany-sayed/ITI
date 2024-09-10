const router = require("express").Router();
const isAuth = require("../../middlewares/auth.js");
const {
  addCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
} = require("./category.controller.js");

router.post("/add", isAuth(), addCategory);
router.put("/update/:categoryId", isAuth(), updateCategory);
router.get("/all", isAuth(), getAllCategories);
router.delete("/delete/:categoryId", isAuth(), deleteCategory);

module.exports = router;
