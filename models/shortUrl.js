const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
