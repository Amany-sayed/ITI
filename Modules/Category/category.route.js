const router = require("express").Router();
const { addCategory, updateCategory, getAllCategories, deleteCategory } = require("./category.controller.js");

router.post("/categories", addCategory);
router.put("/categories/:categoryId", updateCategory);
router.get("/categories", getAllCategories);
router.delete("/categories/:categoryId", deleteCategory);

module.exports = router;
