const express = require('express');
const Pillow = require('../Models/Pillow')
const Router = express.Router();

// Route to get all Pillows
Router.get('/getAllPillows', (req, res) => {
    Pillow.find()
        .then(PillowsData => res.json(PillowsData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Pillows');
        });
});


// Route to get Pillows by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const PillowsData = await Pillow.find({ category: category });
        console.log('Pillows found:', PillowsData);

        if (PillowsData.length > 0) {
            res.json(PillowsData);
        } else {
            res.status(404).send(`No Pillows found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting Pillows');
    }
});


// Route to get a single Pillow by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Pillow.findById(id)
        .then(PillowData => {
            if (PillowData) {
                res.json(PillowData);
            } else {
                res.status(404).send('Pillow not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Pillow');
        });
});


// Route to create a new Pillow (Admin only)
Router.post('/', (req, res) => {
    const Pillow = new Pillow(req.body);

    Pillow.save()
        .then(newPillow => res.status(201).json(newPillow))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating Pillow');
        });
});

// Route to update a Pillow by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Pillow.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedPillow => {
            if (updatedPillow) {
                res.json(updatedPillow);
            } else {
                res.status(404).send('Pillow not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating Pillow');
        });
});

// Route to delete a Pillow by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Pillow.findByIdAndDelete(id)
        .then(deletedPillow => {
            if (deletedPillow) {
                res.json({ message: 'Pillow deleted successfully' });
            } else {
                res.status(404).send('Pillow not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting Pillow');
        });
});


module.exports = Router;
