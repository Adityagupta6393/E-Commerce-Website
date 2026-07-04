const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db.js');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Importing routes
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const categoryRouter = require('./routes/categories.js');
const productRouter = require('./routes/products.js');
const razorpayRouter = require('./routes/razorpay.js')
const orderRouter = require('./routes/orders.js');
const customizeRouter = require('./routes/customize.js');



//database connection
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/razorpay", razorpayRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);

//Run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})