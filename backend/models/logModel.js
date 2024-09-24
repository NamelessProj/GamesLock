const mongoose = require('mongoose');

const logModel = mongoose.Schema({
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