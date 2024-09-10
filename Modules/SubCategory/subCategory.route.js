const isAuth = require("../../middlewares/auth.js");
const router = require("express").Router();
const {
  addSubCategory,
  updateSubCategory,
  getAllSubCategories,
  deleteSubCategory,
} = require("./subCategory.controller.js");

router.post("/add", isAuth(), addSubCategory);
router.put("/update/:subCategoryId", isAuth(), updateSubCategory);
router.get("/all", isAuth(), getAllSubCategories);
router.delete("/delete/:subCategoryId", isAuth(), deleteSubCategory);

module.exports = router;
