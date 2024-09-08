const express = require('express');
const Coffee = require('../Models/Coffee')
const Router = express.Router();

// Route to get all Coffees
Router.get('/getAllCoffees', (req, res) => {
    Coffee.find()
        .then(CoffeesData => res.json(CoffeesData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Coffees');
        });
});


// Route to get Coffees by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const CoffeesData = await Coffee.find({ category: category });
        console.log('Coffees found:', CoffeesData);

        if (CoffeesData.length > 0) {
            res.json(CoffeesData);
        } else {
            res.status(404).send(`No Coffees found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting Coffees');
    }
});


// Route to get a single Coffee by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Coffee.findById(id)
        .then(CoffeeData => {
            if (CoffeeData) {
                res.json(CoffeeData);
            } else {
                res.status(404).send('Coffee not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Coffee');
        });
});


// Route to create a new Coffee (Admin only)
Router.post('/', (req, res) => {
    const Coffee = new Coffee(req.body);

    Coffee.save()
        .then(newCoffee => res.status(201).json(newCoffee))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating Coffee');
        });
});

// Route to update a Coffee by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Coffee.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedCoffee => {
            if (updatedCoffee) {
                res.json(updatedCoffee);
            } else {
                res.status(404).send('Coffee not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating Coffee');
        });
});

// Route to delete a Coffee by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Coffee.findByIdAndDelete(id)
        .then(deletedCoffee => {
            if (deletedCoffee) {
                res.json({ message: 'Coffee deleted successfully' });
            } else {
                res.status(404).send('Coffee not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting Coffee');
        });
});


module.exports = Router;
