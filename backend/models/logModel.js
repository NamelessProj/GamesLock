const mongoose = require('mongoose');

const logModel = mongoose.Schema({
    city: {
        type: String,
        default: '',
        trim: true
    },
    country: {
        type: String,
        default: '',
        trim: true
    },
    countryName: {
        type: String,
        default: '',
        trim: true
    },
    system: {
        type: String,
        default: '',
        trim: true
    },
    platform: {
        type: String,
        default: '',
        trim: true
    },
    deviceName: {
        type: String,
        default: '',
        trim: true
    },
    ip: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Log', logModel);