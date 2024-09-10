const { model, Schema } = require("mongoose");

const RatingSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});
const Rating = model("Rating", RatingSchema);
module.exports = Rating;
