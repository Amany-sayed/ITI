const { model, Schema } = require("mongoose");
const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  discountPercentage: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  weight: String,
  sizes: [
    {
      type: String,
    },
  ],
  warrantyInformation: String,
  shippingInformation: String,
  returnPolicy: String,
  images: [{ type: String, required: true }],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
});

const Product = model("Product", productSchema);
module.exports = Product;
