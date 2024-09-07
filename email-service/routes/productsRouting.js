const Product = require('../Models/Product');
const express = require('express');
const Router = express.Router();

// Route for getting products by category
Router.get('/:category', (req, res) => {
    const { category } = req.params;

    
    Product.find({ category: category })
        .then(productsData => {
            if (productsData.length > 0) {
                res.json(productsData);
            } else {
                res.status(404).send('No products found for this category');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error getting products');
        });
});

// Route for getting a single product by ID
Router.get('/:id', (req, res) => {
    const prodId = req.params.id;

    Product.findById(prodId)
        .then(productData => {
            if (productData) {
                res.json(productData);
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error getting product');
        });
});

module.exports = Router;
