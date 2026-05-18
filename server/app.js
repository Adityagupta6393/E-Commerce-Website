const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db.js');



//database connection
connectDB();


//Run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})