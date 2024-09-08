const express = require('express');
const Candle = require('../Models/Candles')
const Router = express.Router();

// Route to get all Candles
Router.get('/getAllCandles', (req, res) => {
    Candle.find()
        .then(CandlesData => res.json(CandlesData))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Candles');
        });
});


// Route to get Candles by category
Router.get('/:category', async (req, res) => {
    const { category } = req.params;
    console.log('Requested category:', category);

    try {
        const CandlesData = await Candle.find({ category: category });
        console.log('Candles found:', CandlesData);

        if (CandlesData.length > 0) {
            res.json(CandlesData);
        } else {
            res.status(404).send(`No Candles found for category: ${category}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting Candles');
    }
});


// Route to get a single Candle by ID
Router.get('/:id', (req, res) => {
    const { id } = req.params;

    Candle.findById(id)
        .then(CandleData => {
            if (CandleData) {
                res.json(CandleData);
            } else {
                res.status(404).send('Candle not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching Candle');
        });
});


// Route to create a new Candle (Admin only)
Router.post('/', (req, res) => {
    const Candle = new Candle(req.body);

    Candle.save()
        .then(newCandle => res.status(201).json(newCandle))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error creating Candle');
        });
});

// Route to update a Candle by ID (Admin only)
Router.put('/:id', (req, res) => {
    const { id } = req.params;

    Candle.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedCandle => {
            if (updatedCandle) {
                res.json(updatedCandle);
            } else {
                res.status(404).send('Candle not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating Candle');
        });
});

// Route to delete a Candle by ID (Admin only)
Router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Candle.findByIdAndDelete(id)
        .then(deletedCandle => {
            if (deletedCandle) {
                res.json({ message: 'Candle deleted successfully' });
            } else {
                res.status(404).send('Candle not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting Candle');
        });
});


module.exports = Router;
