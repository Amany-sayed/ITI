const express = require('express');
const Mattress=require('../Models/Mattress');
const Router = express.Router();

// Route to get all Mattress
Router.get('/getAllMattress', (req, res) => {
    Mattress.find()
        .then(MattressData => res.json(MattressData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Mattress');
        });
});


// Route to get Mattress by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const MattressData = await Mattress.find({ category: category });
        console.log('Mattress found:', MattressData);

        if (MattressData.length > 0) {
            res.json(MattressData);
        } else {
            res.status(404).send(`No Mattress found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting Mattress');
    }
});


// Route to get a single Mattress by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Mattress.findById(id)
        .then(MattressData => {
            if (MattressData) {
                res.json(MattressData);
            } else {
                res.status(404).send('Mattress not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Mattress');
        });
});


// Route to create a new Mattress (Admin only)
Router.post('/', (req, res) => {
    const Mattress = new Mattress(req.body);

    Mattress.save()
        .then(newMattress => res.status(201).json(newMattress))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating Mattress');
        });
});

// Route to update a Mattress by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Mattress.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedMattress => {
            if (updatedMattress) {
                res.json(updatedMattress);
            } else {
                res.status(404).send('Mattress not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating Mattress');
        });
});

// Route to delete a Mattress by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Mattress.findByIdAndDelete(id)
        .then(deletedMattress => {
            if (deletedMattress) {
                res.json({ message: 'Mattress deleted successfully' });
            } else {
                res.status(404).send('Mattress not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting Mattress');
        });
});


module.exports = Router;
