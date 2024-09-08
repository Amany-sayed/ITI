const mongoose = require('mongoose');

let bathSchema = mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
    stock: { type: Number, default: 0 },
    sku: String,
    weight: String,
    dimensions: {
        type: String,
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [{ type: String }],
    returnPolicy: String,
    minimumOrderQuantity: { type: Number, default: 1 },
    meta: {
        type: Map,
        of: String
    },
    images: [{ type: String }],
    thumbnail: String
});

module.exports = mongoose.model('Bath', bathSchema);
