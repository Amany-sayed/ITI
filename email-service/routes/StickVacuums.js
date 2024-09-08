const express = require('express');
const StickVac = require('../Models/stickVacuums')
const Router = express.Router();

// Route to get all StickVacs
Router.get('/getAllStickVacs', (req, res) => {
    StickVac.find()
        .then(StickVacsData => res.json(StickVacsData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching StickVacs');
        });
});


// Route to get StickVacs by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const StickVacsData = await StickVac.find({ category: category });
        console.log('StickVacs found:', StickVacsData);

        if (StickVacsData.length > 0) {
            res.json(StickVacsData);
        } else {
            res.status(404).send(`No StickVacs found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting StickVacs');
    }
});


// Route to get a single StickVac by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    StickVac.findById(id)
        .then(StickVacData => {
            if (StickVacData) {
                res.json(StickVacData);
            } else {
                res.status(404).send('StickVac not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching StickVac');
        });
});


// Route to create a new StickVac (Admin only)
Router.post('/', (req, res) => {
    const StickVac = new StickVac(req.body);

    StickVac.save()
        .then(newStickVac => res.status(201).json(newStickVac))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating StickVac');
        });
});

// Route to update a StickVac by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    StickVac.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedStickVac => {
            if (updatedStickVac) {
                res.json(updatedStickVac);
            } else {
                res.status(404).send('StickVac not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating StickVac');
        });
});

// Route to delete a StickVac by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    StickVac.findByIdAndDelete(id)
        .then(deletedStickVac => {
            if (deletedStickVac) {
                res.json({ message: 'StickVac deleted successfully' });
            } else {
                res.status(404).send('StickVac not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting StickVac');
        });
});


module.exports = Router;
