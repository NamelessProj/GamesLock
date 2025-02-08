const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        path: {
            type: String,
            trim: true,
            default: ''
        },
        alt: {
            type: String,
            trim: true,
            default: ''
        },
        isSensitive: {
            type: Boolean,
            default: false
        }
    },
    game: {
        type: String,
        trim: true,
    },
    isFromUser: {
        type: Boolean,
        default: true
    },
    color: {
        a: {
            type: String,
            trim: true,
            default: ''
        },
        b: {
            type: String,
            trim: true,
            default: ''
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);