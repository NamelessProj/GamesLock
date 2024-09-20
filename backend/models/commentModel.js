const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentModel);