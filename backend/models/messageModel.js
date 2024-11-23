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
        },
        alt: {
            type: String,
            trim: true,
        }
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
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);