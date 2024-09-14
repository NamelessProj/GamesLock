const express = require('express');
const {errorHandler} = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/message', require('./routes/messageRoute'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to DB: ${err}`);
});