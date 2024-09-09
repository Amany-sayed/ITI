const { Rating } = require("../../Models/Rating.model.js");
const { Product } = require("../../Models/Product.model.js");
const { User } = require("../../Models/User.model.js");

 const addRatingAndReview = async (req, res, next) => {
    const { rating, user: userId, product: productId, review } = req.body;

    try {
        
        if (!rating || !userId || !productId || !review) {
            return next(new Error("All fields are required", { cause: 400 }));
        }

        if (rating < 1 || rating > 5) {
            return next(new Error("Rating must be between 1 and 5", { cause: 400 }));
        }

        const user = await User.findById(userId);
        if (!user) {
            return next(new Error("User not found", { cause: 404 }));
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(new Error("Product not found", { cause: 404 }));
        }

        const newRating = await Rating.create({
            rating,
            user: userId,
            product: productId,
            review
        });

        res.status(201).json({ message: "Rating and review added successfully", newRating });
    } catch (error) {
        next(new Error("Failed to add rating and review", { cause: 400, error }));
    }
};
module.exports ={addRatingAndReview}