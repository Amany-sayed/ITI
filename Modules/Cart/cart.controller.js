const Cart = require("../../Models/Cart.model");
const  Product  = require("../../Models/Product.model");

// MARK: add to cart
const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.authUser._id;

  // Log the userId to ensure it is correctly extracted
  console.log("userId:", req.authUser);

  if (!userId) {
    return next(new Error("User ID is required", { cause: 400 }));
  }

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) return next(new Error("Product not found", { cause: 404 }));
    if (product.stock < quantity)
      return next(new Error("There is not enough items", { cause: 400 }));

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [], subTotal: 0 });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.subTotal = cart.products.reduce((total, item) => {
      const productPrice = product.priceAfterDiscount || product.price;
      return total + item.quantity * productPrice;
    }, 0);
    product.stock -= quantity;
    await product.save();
    const updatedCart = await cart.save();
    res
      .status(201)
      .json({ message: "Product added to cart", cart: updatedCart });
  } catch (error) {
    next(new Error(error.message, { cause: 400, error }));
  }
};

module.exports = { addToCart };
// MARK: delete from cart
const deleteFromTheCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.authUser._id;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return next(new Error("Cart not found", { cause: 404 }));

    const product = await Product.findById(productId);
    if (!product) new Error("there's no such product", { cause: 400, error });
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    product.stock += cart.products[productIndex].quantity;
    cart.products = cart.products.filter(
      (item) => item.productId._id.toString() !== productId
    );

    cart.subTotal = cart.products.reduce((total, item) => {
      const productPrice =
        item.productId.priceAfterDiscount || item.productId.price;
      return total + item.quantity * productPrice;
    }, 0);

    const updatedCart = await cart.save();
    res
      .status(200)
      .json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    next(
      new Error("Failed to remove product from cart", { cause: 400, error })
    );
  }
};

// MARK: show cart
const showCart = async (req, res, next) => {
  const userId = req.authUser._id;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return next(new Error("Cart not found", { cause: 404 }));
    res.status(200).json({ message: "Cart retrieved successfully", cart });
  } catch (error) {
    next(new Error("Failed to retrieve cart", { cause: 400, error }));
  }
};

// MARK: update cart
const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) return next(new Error("Product not found", { cause: 404 }));

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return next(new Error("Cart not found", { cause: 404 }));

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;

      cart.subTotal = cart.products.reduce((total, item) => {
        const productPrice =
          item.productId.priceAfterDiscount || item.productId.price;
        return total + item.quantity * productPrice;
      }, 0);

      const updatedCart = await cart.save();
      res
        .status(200)
        .json({ message: "Cart updated successfully", cart: updatedCart });
    } else {
      return next(new Error("Product not found in cart", { cause: 404 }));
    }
  } catch (error) {
    next(new Error("Failed to update cart", { cause: 400, error }));
  }
};

module.exports = {
  updateCart,
  showCart,
  deleteFromTheCart,
  addToCart,
};
