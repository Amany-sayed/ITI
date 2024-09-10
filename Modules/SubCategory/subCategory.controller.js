const SubCategory = require("../../Models/SubCategory.model.js");
const Category = require("../../Models/Category.model.js");
const Brand = require("../../Models/Brand.model.js");
const Product = require("../../Models/Product.model.js");

//addSubCategory
const addSubCategory = async (req, res, next) => {
  const { name, description, category: categoryId } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return next(new Error("Category not found", { cause: 404 }));

    const existingSubCategory = await SubCategory.findOne({
      name,
      category: categoryId,
    });
    if (existingSubCategory) {
      return next(new Error("SubCategory already exists", { cause: 400 }));
    }

    const newSubCategory = await SubCategory.create({
      name,
      description,
      image: "amany",
      category: categoryId,
    });

    res
      .status(201)
      .json({ message: "SubCategory added successfully", newSubCategory });
  } catch (error) {
    next(new Error("Failed to add subcategory", { cause: 400, error }));
  }
};

//updateSubCategory
const updateSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params;
  const { name, description, image, category: categoryId } = req.body;

  try {
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory)
      return next(new Error("SubCategory not found", { cause: 404 }));

    const category = await Category.findById(categoryId);
    if (!category) return next(new Error("Category not found", { cause: 404 }));

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { name, description, image, category: categoryId },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "SubCategory updated successfully",
      updatedSubCategory,
    });
  } catch (error) {
    next(new Error("Failed to update subcategory", { cause: 400, error }));
  }
};

//getAllSubCategories
const getAllSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find().populate("Category");

    res
      .status(200)
      .json({ message: "SubCategories retrieved successfully", subCategories });
  } catch (error) {
    next(new Error("Failed to retrieve subcategories", { cause: 400, error }));
  }
};

//deleteSubCategory
const deleteSubCategory = async (req, res, next) => {
  const { subCategoryId } = req.params;

  try {
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory)
      return next(new Error("SubCategory not found", { cause: 404 }));

    await Brand.deleteMany({ subCategory: subCategoryId });

    await Product.deleteMany({ subCategory: subCategoryId });

    const deletedSubCategory = await SubCategory.findByIdAndDelete(
      subCategoryId
    );

    res.status(200).json({
      message: "SubCategory and associated data deleted successfully",
      deletedSubCategory,
    });
  } catch (error) {
    next(new Error("Failed to delete subcategory", { cause: 400, error }));
  }
};

module.exports = {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
};
