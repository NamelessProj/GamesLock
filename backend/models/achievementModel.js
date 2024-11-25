const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    key: {
        type: String,
        default: '',
        unique: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Achievement', achievementSchema);