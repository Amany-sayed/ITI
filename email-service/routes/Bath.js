const express = require('express');
const Bath = require('../Models/inBathProduct')
const Router = express.Router();

// Route to get all Baths
Router.get('/getAllBaths', (req, res) => {
    Bath.find()
        .then(BathsData => res.json(BathsData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Baths');
        });
});


// Route to get Baths by category
Router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const BathsData = await Bath.find({ category: category });
        console.log('Baths found:', BathsData);

        if (BathsData.length > 0) {
            res.json(BathsData);
        } else {
            res.status(404).send(`No Baths found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting Baths');
    }
});


// Route to get a single Bath by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Bath.findById(id)
        .then(BathData => {
            if (BathData) {
                res.json(BathData);
            } else {
                res.status(404).send('Bath not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Bath');
        });
});


// Route to create a new Bath (Admin only)
Router.post('/', (req, res) => {
    const Bath = new Bath(req.body);

    Bath.save()
        .then(newBath => res.status(201).json(newBath))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating Bath');
        });
});

// Route to update a Bath by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Bath.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedBath => {
            if (updatedBath) {
                res.json(updatedBath);
            } else {
                res.status(404).send('Bath not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating Bath');
        });
});

// Route to delete a Bath by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Bath.findByIdAndDelete(id)
        .then(deletedBath => {
            if (deletedBath) {
                res.json({ message: 'Bath deleted successfully' });
            } else {
                res.status(404).send('Bath not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting Bath');
        });
});


module.exports = Router;
