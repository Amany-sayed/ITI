const express = require('express');
const isAuth = require('../controller/auth.js');
const ca = require('../Modules/cart/cart.controller.js');
const { validationCoreFunction } = require('../controller/validation');
const { addToCartSchema, deleteFromCartSchema, updateCartSchema } = require('../Modules/cart/cart.validationSchemas.js');

const Router = express.Router();

// Add to Cart route
Router.post(
    "/addtocart",
    validationCoreFunction(addToCartSchema),  // Validate the input
    isAuth(ca.addToCart),  // Ensure user is authenticated
      // Add to cart controller function
);

// Delete from Cart route 
Router.delete(
    "/deleteFromCart",
    validationCoreFunction(deleteFromCartSchema),
    isAuth (ca.deleteFromCart),
    
);

// Show Cart route
Router.get(
    "/showCart",
    isAuth(ca.showCart)
    
);

// Update Cart route
Router.put(
    "/updateCart",
    validationCoreFunction(updateCartSchema),
    isAuth(ca.updateCart)
   
);

module.exports = Router;
