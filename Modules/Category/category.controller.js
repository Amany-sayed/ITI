const Category = require("../../Models/Category.model.js");
const Brand = require("../../Models/Brand.model.js");
const SubCategory = require("../../Models/SubCategory.model.js");
const Product = require("../../Models/Product.model.js");

//addCategory
const addCategory = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next(new Error("Category already exists", { cause: 400 }));
    }

    // Create the new category
    const newCategory = await Category.create({
      name,
      description,
      image: "amany",
    });

    res
      .status(201)
      .json({ message: "Category added successfully", newCategory });
  } catch (error) {
    next(new Error("Failed to add category", { cause: 400, error }));
  }
};

//updateCategory
const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { name, description, image } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return next(new Error("Category not found", { cause: 404 }));

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description, image },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    next(new Error("Failed to update category", { cause: 400, error }));
  }
};

//getAllCategories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res
      .status(200)
      .json({ message: "Categories retrieved successfully", categories });
  } catch (error) {
    next(new Error("Failed to retrieve categories", { cause: 400, error }));
  }
};

//deleteCategory
const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return next(new Error("Category not found", { cause: 404 }));

    await SubCategory.deleteMany({ Category: categoryId });

    await Brand.deleteMany({ Category: categoryId });

    await Product.deleteMany({ Category: categoryId });

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      message: "Category and associated data deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    next(new Error("Failed to delete category", { cause: 400, error }));
  }
};

module.exports = {
  deleteCategory,
  getAllCategories,
  updateCategory,
  addCategory,
};
