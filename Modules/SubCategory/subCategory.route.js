const router = require("express").Router();
const { addSubCategory, updateSubCategory, getAllSubCategories, deleteSubCategory } = require("./subCategory.controller.js");

router.post("/subcategories", addSubCategory);
router.put("/subcategories/:subCategoryId", updateSubCategory);
router.get("/subcategories", getAllSubCategories);
router.delete("/subcategories/:subCategoryId", deleteSubCategory);

module.exports = router;