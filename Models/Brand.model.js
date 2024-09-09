const { model, Schema } = require("mongoose");
const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  SubCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
});
const Brand = model("Brand", BrandSchema);
exports.Brand = Brand;
