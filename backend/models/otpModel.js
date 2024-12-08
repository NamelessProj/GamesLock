const mongoose = require('mongoose');

const otpModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['register', 'login', 'reset', 'delete', 'update'],
        default: 'register'
    },
}, {timestamps: true});

module.exports = mongoose.model('Otp', otpModel);