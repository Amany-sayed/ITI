const Cart = require('../Models/Cart.js');
const express = require('express');
const isAuth = require('../controller/auth.js')
const ca = require('../Modules/cart/cart.controller.js');
const { validationCoreFunction } = require('../controller/validation');
const { addToCartSchema } = require('../Modules/cart/cart.validationSchemas.js');

const Router = express.Router();

Router.post("/addtocart",
    isAuth(ca.addToCart),
    validationCoreFunction(addToCartSchema),
);
Router.put(  "/deleteFromCart",
    isAuth(ca.deleteFromCart),
    validationCoreFunction(addToCartSchema),
);
module.exports = Router;
