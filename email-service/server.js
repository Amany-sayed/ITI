const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const appRoute = require('./routes/routs.js');
const BathRouts = require('./routes/Bath.js');
const BlenderRouts = require('./routes/Blenders.js');
const CookingRouts = require('./routes/Cooking.js');
const CandleRouts = require('./routes/Candles.js');
const PillowRouts = require('./routes/Pillow.js');
const MattressRouts=require('./routes/Mattress.js');
const CoffeeRouts=require('./routes/CoffeeMakers.js');
const StickVacRouts=require('./routes/StickVacuums.js');
const EMachinesRouts=require('./routes/ElectricMachines.js');
const cartRouts = require('./routes/cartRouting.js');
const app = express();
const uri = "mongodb+srv://amany:uVPPJrUv66kKjXyG@cluster0.ptd1n.mongodb.net/Products";


dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/** Routes */
app.use('/api', appRoute);
app.use('/cart', cartRouts);
app.use('/inBath', BathRouts);  
app.use('/mattress', MattressRouts);  
app.use('/blender', BlenderRouts);  
app.use('/candle', CandleRouts);  
app.use('/pillow', PillowRouts);  
app.use('/coffee', CoffeeRouts);  
app.use('/cookingtools', CookingRouts);  
app.use('/eMachine', EMachinesRouts);  
app.use('/stick', StickVacRouts);  

mongoose.connect(uri)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('can not connect to your database',err);
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


// http://localhost:3000/mattress/getAllMattress
// http://localhost:3000/blender/getAllBlenders
// http://localhost:3000/inBath/getAllBaths
// http://localhost:3000/candle/getAllCandles
// http://localhost:3000/pillow//getAllPillows
// http://localhost:3000/eMachine/getAllEMachiness
// http://localhost:3000/cookingtools/getAllCookings
// http://localhost:3000/coffee/getAllCoffees
// http://localhost:3000/stick/getAllStickVacs