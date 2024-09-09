const Cart = require("../../Models/Cart.model");
const productModel = require("../../Models/Product.model");

// MARK: add to cart
module.exports = addToCart = async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const product = await productModel.findById(productId);
  if (!product) return next(new Error("Product not found", { cause: 404 }));
  if (product.stock < quantity)
    return next(new Error("Quantity not available", { cause: 400 }));

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    const cartObject = {
      userId,
      products: [{ productId, quantity }],
      subTotal: product.priceAfterDiscount * quantity,
    };
    const cartDb = await Cart.create(cartObject);
    if (!cartDb)
      return next(new Error("Failed to add to cart", { cause: 400 }));
    return res.status(201).json({ message: "Added to cart", cartDb });
  }

  let flag = false;
  for (const item of cart.products) {
    if (String(item.productId) === String(productId)) {
      item.quantity += quantity;
      flag = true;
      break;
    }
  }

  if (!flag) {
    cart.products.push({ productId, quantity });
  }

  // Update cart subtotal
  cart.subTotal = cart.products.reduce((sum, item) => {
    const prod = item.productId._id.equals(product._id)
      ? product
      : item.productId;
    return sum + item.quantity * prod.priceAfterDiscount;
  }, 0);

  const cartDb = await cart.save();
  if (!cartDb) return next(new Error("Failed to add to cart", { cause: 400 }));
  res.status(201).json({ message: "Added to cart", cartDb });
};

// MARK: delete from cart
module.exports = deleteFromTheCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId }).populate("products.productId");
  if (!cart) return next(new Error("Cart not found", { cause: 404 }));

  let productFound = false;
  cart.products = cart.products.filter((item) => {
    if (String(item.productId._id) === String(productId)) {
      productFound = true;
      return false;
    }
    return true;
  });

  if (!productFound)
    return next(new Error("Product not found in cart", { cause: 404 }));

  // Update cart subtotal
  cart.subTotal = cart.products.reduce(
    (sum, item) => sum + item.quantity * item.productId.priceAfterDiscount,
    0
  );

  const cartDb = await cart.save();
  if (!cartDb)
    return next(new Error("Failed to delete from cart", { cause: 400 }));

  res.status(200).json({ message: "Deleted from cart", cartDb });
};

// MARK: show cart
module.exports = showCart = async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId }).populate(
    "products.productId",
    "name priceAfterDiscount"
  );
  if (!cart) return next(new Error("Cart not found", { cause: 404 }));

  res.status(200).json({ message: "Cart retrieved", cart });
};

// MARK: update cart
module.exports = updateCart = async (req, res, next) => {
  const userId = req.user._id;
  const { productId, newQuantity } = req.body;

  const product = await productModel.findById(productId);
  if (!product) return next(new Error("Product not found", { cause: 404 }));

  const cart = await Cart.findOne({ userId }).populate("products.productId");
  if (!cart) return next(new Error("Cart not found", { cause: 404 }));

  let updated = false;
  cart.products = cart.products.map((item) => {
    if (String(item.productId._id) === String(productId)) {
      item.quantity = newQuantity;
      updated = true;
    }
    return item;
  });

  if (!updated)
    return next(new Error("Product not found in cart", { cause: 404 }));

  // Update cart subtotal
  cart.subTotal = cart.products.reduce(
    (sum, item) => sum + item.quantity * item.productId.priceAfterDiscount,
    0
  );

  const cartDb = await cart.save();
  if (!cartDb) return next(new Error("Failed to update cart", { cause: 400 }));

  res.status(200).json({ message: "Cart updated", cartDb });
};
