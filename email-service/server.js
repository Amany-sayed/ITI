const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const appRoute = require('./routes/routs.js');
const app = express();
const PORT = 3000;
const ProductsRouts = require('./routes/productsRouting.js')
app.use(cors());
//const cartRouts =require('./routes/cartRouting.js')
require('dotenv').config();
app.use(express.json());

/** routes */
app.use('/api', appRoute);

mongoose.connect('mongodb+srv://amany:uVPPJrUv66kKjXyG@cluster0.ptd1n.mongodb.net/Products?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('can not connect to your database');
    });


app.use('/product', ProductsRouts);
//app.use('/cart',cartRouts);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
