const mongoose = require('mongoose');

const reportModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, {timestamps: true});

module.exports = mongoose.model('Report', reportModel);