const express = require('express');
const Cooking = require('../Models/Cooking')
const Router = express.Router();

// Route to get all Cookings
Router.get('/getAllCookings', (req, res) => {
    Cooking.find()
        .then(CookingsData => res.json(CookingsData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Cookings');
        });
});


// Route to get Cookings by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const CookingsData = await Cooking.find({ category: category });
        console.log('Cookings found:', CookingsData);

        if (CookingsData.length > 0) {
            res.json(CookingsData);
        } else {
            res.status(404).send(`No Cookings found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting Cookings');
    }
});


// Route to get a single Cooking by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Cooking.findById(id)
        .then(CookingData => {
            if (CookingData) {
                res.json(CookingData);
            } else {
                res.status(404).send('Cooking not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Cooking');
        });
});


// Route to create a new Cooking (Admin only)
Router.post('/', (req, res) => {
    const Cooking = new Cooking(req.body);

    Cooking.save()
        .then(newCooking => res.status(201).json(newCooking))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating Cooking');
        });
});

// Route to update a Cooking by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Cooking.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedCooking => {
            if (updatedCooking) {
                res.json(updatedCooking);
            } else {
                res.status(404).send('Cooking not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating Cooking');
        });
});

// Route to delete a Cooking by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Cooking.findByIdAndDelete(id)
        .then(deletedCooking => {
            if (deletedCooking) {
                res.json({ message: 'Cooking deleted successfully' });
            } else {
                res.status(404).send('Cooking not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting Cooking');
        });
});


module.exports = Router;
