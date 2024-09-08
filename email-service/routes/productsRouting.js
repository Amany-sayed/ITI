const express = require('express');
const Product = require('../Models/Product');
const Router = express.Router();

// Route to get all products
Router.get('/getAllProducts', (req, res) => {
    Product.find()
        .then(productsData => res.json(productsData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching products');
        });
});


// Route to get products by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const productsData = await Product.find({ category: category });
        console.log('Products found:', productsData);

        if (productsData.length > 0) {
            res.json(productsData);
        } else {
            res.status(404).send(`No products found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting products');
    }
});


// Route to get a single product by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Product.findById(id)
        .then(productData => {
            if (productData) {
                res.json(productData);
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching product');
        });
});


// Route to create a new product (Admin only)
Router.post('/', (req, res) => {
    const product = new Product(req.body);

    product.save()
        .then(newProduct => res.status(201).json(newProduct))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating product');
        });
});

// Route to update a product by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedProduct => {
            if (updatedProduct) {
                res.json(updatedProduct);
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating product');
        });
});

// Route to delete a product by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Product.findByIdAndDelete(id)
        .then(deletedProduct => {
            if (deletedProduct) {
                res.json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting product');
        });
});


module.exports = Router;
