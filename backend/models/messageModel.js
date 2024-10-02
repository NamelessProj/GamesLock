const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    game: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    isReported: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);