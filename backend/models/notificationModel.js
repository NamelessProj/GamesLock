const mongoose = require('mongoose');

const notificationModel = mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    view: {
        type: Boolean,
        default: false
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Notification', notificationModel);