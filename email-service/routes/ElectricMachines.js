const express = require('express');
const EMachines = require('../Models/ElectricMachines')
const Router = express.Router();

// Route to get all EMachiness
Router.get('/getAllEMachiness', (req, res) => {
    EMachines.find()
        .then(EMachinessData => res.json(EMachinessData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching EMachiness');
        });
});


// Route to get EMachiness by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const EMachinessData = await EMachines.find({ category: category });
        console.log('EMachiness found:', EMachinessData);

        if (EMachinessData.length > 0) {
            res.json(EMachinessData);
        } else {
            res.status(404).send(`No EMachiness found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting EMachiness');
    }
});


// Route to get a single EMachines by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    EMachines.findById(id)
        .then(EMachinesData => {
            if (EMachinesData) {
                res.json(EMachinesData);
            } else {
                res.status(404).send('EMachines not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching EMachines');
        });
});


// Route to create a new EMachines (Admin only)
Router.post('/', (req, res) => {
    const EMachines = new EMachines(req.body);

    EMachines.save()
        .then(newEMachines => res.status(201).json(newEMachines))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating EMachines');
        });
});

// Route to update a EMachines by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    EMachines.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedEMachines => {
            if (updatedEMachines) {
                res.json(updatedEMachines);
            } else {
                res.status(404).send('EMachines not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating EMachines');
        });
});

// Route to delete a EMachines by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    EMachines.findByIdAndDelete(id)
        .then(deletedEMachines => {
            if (deletedEMachines) {
                res.json({ message: 'EMachines deleted successfully' });
            } else {
                res.status(404).send('EMachines not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting EMachines');
        });
});


module.exports = Router;
