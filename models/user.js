const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{6,}$/
    },
    urls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShortUrl',
    }],

}, {
    timestamps: true,
    versionKey: false
});
const User = mongoose.model('User', userSchema);
module.exports = User
