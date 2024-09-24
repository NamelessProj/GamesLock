const mongoose = require('mongoose');

const logModel = mongoose.Schema({
    country: {
        type: String,
        required: true,
        default: '',
        trim: true
    },
    countryName: {
        type: String,
        required: true,
        default: '',
        trim: true
    },
    region: {
        type: String,
        required: true,
        default: '',
        trim: true
    },
    system: {
        type: String,
        required: true,
        default: '',
        trim: true
    },
    systemName: {
        type: String,
        required: true,
        default: '',
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Log', logModel);