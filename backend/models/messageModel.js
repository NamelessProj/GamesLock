const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);