const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    city: {
        type: String
    },
    bio: {
        type: String
    },
    status: {
        type: String
    },
    hashedPassword: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);