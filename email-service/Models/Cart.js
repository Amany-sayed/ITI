const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1,
                },
            },
        ],
        subTotal: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

// Pre-save hook to calculate subTotal
CartSchema.pre('save', async function (next) {
    try {
      
        await this.populate('products.productId').execPopulate();

      
        this.subTotal = this.products.reduce((acc, product) => {
            return acc + product.quantity * product.productId.price;
        }, 0);

        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Cart', CartSchema);
