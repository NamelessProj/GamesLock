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

// Connection to DB
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// ROUTES
app.use('/images', express.static('uploads'));
app.use('/api/message', require('./routes/messageRoute'));
app.use('/api/comment', require('./routes/commentRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/achievement', require('./routes/achievementRoute'));
app.use('/api/notification', require('./routes/notificationRoutes'));
app.use('/api/log', require('./routes/logRoutes'));
app.use('/api/follow', require('./routes/followRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

app.use(errorHandler);

// Establishing the connection with the DB
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log('The server is running on port:', PORT);
        console.log('Environment:', process.env.NODE_ENV);
    });
});

// Handling error with the DB connection
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to DB:', err);
});