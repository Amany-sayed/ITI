const express = require('express');
const Blender = require('../Models/Blender')
const Router = express.Router();

// Route to get all Blenders
Router.get('/getAllBlenders', (req, res) => {
    Blender.find()
        .then(BlendersData => res.json(BlendersData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Blenders');
        });
});


// Route to get Blenders by category
Router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const BlendersData = await Blender.find({ category: category });
        console.log('Blenders found:', BlendersData);

        if (BlendersData.length > 0) {
            res.json(BlendersData);
        } else {
            res.status(404).send(`No Blenders found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting Blenders');
    }
});


// Route to get a single Blender by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Blender.findById(id)
        .then(BlenderData => {
            if (BlenderData) {
                res.json(BlenderData);
            } else {
                res.status(404).send('Blender not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Blender');
        });
});


// Route to create a new Blender (Admin only)
Router.post('/', (req, res) => {
    const Blender = new Blender(req.body);

    Blender.save()
        .then(newBlender => res.status(201).json(newBlender))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating Blender');
        });
});

// Route to update a Blender by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Blender.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedBlender => {
            if (updatedBlender) {
                res.json(updatedBlender);
            } else {
                res.status(404).send('Blender not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating Blender');
        });
});

// Route to delete a Blender by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Blender.findByIdAndDelete(id)
        .then(deletedBlender => {
            if (deletedBlender) {
                res.json({ message: 'Blender deleted successfully' });
            } else {
                res.status(404).send('Blender not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting Blender');
        });
});


module.exports = Router;
