const { Product } = require("../../Models/Product.model.js");
const { Category } = require("../../Models/Category.model.js");
const { SubCategory } = require("../../Models/SubCategory.model.js");
const { Brand } = require("../../Models/Brand.model.js");

//addProduct
const addProduct = async (req, res, next) => {
    const { name, description, price, discountPercentage, stock, weight, sizes, warrantyInformation, shippingInformation, returnPolicy, images, category, subCategory, brand } = req.body;

    try {
        const existingCategory = await Category.findById(category);
        const existingSubCategory = await SubCategory.findById(subCategory);
        const existingBrand = await Brand.findById(brand);

        if (!existingCategory) return next(new Error("Category not found", { cause: 404 }));
        if (!existingSubCategory) return next(new Error("SubCategory not found", { cause: 404 }));
        if (!existingBrand) return next(new Error("Brand not found", { cause: 404 }));

        const newProduct = await Product.create({
            name,
            description,
            price,
            discountPercentage,
            stock,
            weight,
            sizes,
            warrantyInformation,
            shippingInformation,
            returnPolicy,
            images,
            category,
            subCategory,
            brand,
        });

        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        next(new Error("Failed to add product", { cause: 400, error }));
    }
};

//updateProduct
const updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    const { name, description, price, discountPercentage, stock, weight, sizes, warrantyInformation, shippingInformation, returnPolicy, images, category, subCategory, brand } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) return next(new Error("Product not found", { cause: 404 }));

        const existingCategory = await Category.findById(category);
        const existingSubCategory = await SubCategory.findById(subCategory);
        const existingBrand = await Brand.findById(brand);

        if (!existingCategory) return next(new Error("Category not found", { cause: 404 }));
        if (!existingSubCategory) return next(new Error("SubCategory not found", { cause: 404 }));
        if (!existingBrand) return next(new Error("Brand not found", { cause: 404 }));

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                price,
                discountPercentage,
                stock,
                weight,
                sizes,
                warrantyInformation,
                shippingInformation,
                returnPolicy,
                images,
                category,
                subCategory,
                brand,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        next(new Error("Failed to update product", { cause: 400, error }));
    }
};

//getAllProducts
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate("category")
            .populate("subCategory")
            .populate("brand");

        res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
        next(new Error("Failed to retrieve products", { cause: 400, error }));
    }
};

//getProductsByID
const getProductsByID = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId)
            .populate("category")
            .populate("subCategory")
            .populate("brand");

        if (!product) return next(new Error("Product not found", { cause: 404 }));

        res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
        next(new Error("Failed to retrieve product", { cause: 400, error }));
    }
};

//getProductsByName
const getProductsByName = async (req, res, next) => {
    const { name } = req.query;

    try {
        const products = await Product.find({ name: new RegExp(name, "i") })
            .populate("category")
            .populate("subCategory")
            .populate("brand");

        if (products.length === 0) return next(new Error("No products found", { cause: 404 }));

        res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
        next(new Error("Failed to retrieve products", { cause: 400, error }));
    }
};

//listProducts
const listProducts = async (req, res, next) => {
    const { category, subCategory, brand } = req.query;

    try {
        const query = {};

        if (category) query.category = category;
        if (subCategory) query.subCategory = subCategory;
        if (brand) query.brand = brand;

        const products = await Product.find(query)
            .populate("category")
            .populate("subCategory")
            .populate("brand");

        res.status(200).json({ message: "Products listed successfully", products });
    } catch (error) {
        next(new Error("Failed to list products", { cause: 400, error }));
    }
};

//deleteProduct
const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;

    try {
        
        const product = await Product.findById(productId);
        if (!product) return next(new Error("Product not found", { cause: 404 }));

        const deletedProduct = await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        next(new Error("Failed to delete product", { cause: 400, error }));
    }
};

module.exports={
    addProduct,deleteProduct,listProducts,getAllProducts,getProductsByID,getProductsByName,updateProduct
}