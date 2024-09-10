const { model, Schema } = require("mongoose");
const SubCategorySchema = new Schema({
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
});
const SubCategory = model("SubCategory", SubCategorySchema);
exports.SubCategory = SubCategory;
