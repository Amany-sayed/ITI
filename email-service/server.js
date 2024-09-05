const express = require('express');
const appRoute = require('./routes/routs.js')
const router = express.Router();
const app = express();
const PORT = 3000;
require('dotenv').config();
app.use(express.json());

/** routes */
app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
