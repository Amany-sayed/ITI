const mongoose = require("mongoose");
const  Brand  = require("../../Models/Brand.model.js");
const  Category  = require("../../Models/Category.model.js");
const  SubCategory  = require("../../Models/SubCategory.model.js");
const  Product  = require("../../Models/Product.model.js");

// Delete Brand
const deleteBrand = async (req, res, next) => {
  const { brandId } = req.params;
  try {
    const brand = await Brand.findById(brandId);
    if (!brand) return next(new Error("Brand not found", { cause: 404 }));
    await Product.deleteMany({ brand: brandId });
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    res
      .status(200)
      .json({
        message: "Brand and associated products deleted successfully",
        deletedBrand,
      });
  } catch (error) {
    next(new Error("Failed to delete brand", { cause: 400, error }));
  }
};

// Add Brand
const addBrand = async (req, res, next) => {
  const {
    name,
    description,
    image,
    category: categoryId,
    subCategory: subCategoryId,
  } = req.body;

  try {
    const category = await Category.findById(categoryId);
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!category) return next(new Error("Category not found", { cause: 404 }));
    if (!subCategory)
      return next(new Error("SubCategory not found", { cause: 404 }));

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return next(new Error("Brand already exists", { cause: 400 }));
    }

    const newBrand = await Brand.create({
      name,
      description,
      image: "amany",
      category: categoryId,
      subCategory: subCategoryId,
    });

    res.status(201).json({ message: "Brand added successfully", newBrand });
  } catch (error) {
    next(new Error("Failed to add brand", { cause: 400, error }));
  }
};

// Update Brand
const updateBrand = async (req, res, next) => {
  const { brandId } = req.params;
  const {
    name,
    description,
    image,
    Category: categoryId,
    SubCategory: subCategoryId,
  } = req.body;

  try {
    const brand = await Brand.findById(brandId);
    if (!brand) return next(new Error("Brand not found", { cause: 404 }));

    const category = await Category.findById(categoryId);
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!category) return next(new Error("Category not found", { cause: 404 }));
    if (!subCategory)
      return next(new Error("SubCategory not found", { cause: 404 }));

    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      {
        name,
        description,
        image,
        Category: categoryId,
        SubCategory: subCategoryId,
      },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Brand updated successfully", updatedBrand });
  } catch (error) {
    next(new Error("Failed to update brand", { cause: 400, error }));
  }
};

// Get Brand
const getBrand = async (req, res, next) => {
  const { brandId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    return next(new Error("Invalid brand ID format", { cause: 400 }));
  }

  try {
    const brand = await Brand.findById(brandId).populate(
      "Category SubCategory"
    );

    if (!brand) {
      return next(new Error("Brand not found", { cause: 404 }));
    }

    res.status(200).json({
      message: "Brand retrieved successfully",
      brand,
    });
  } catch (error) {
    next(new Error("Failed to retrieve brand", { cause: 400, error }));
  }
};

module.exports = {
  deleteBrand,
  addBrand,
  updateBrand,
  getBrand,
};
