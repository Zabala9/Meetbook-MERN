const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        require: true
    },
    privacy: {
        type: String,
        require: true
    },
    imageUrls: {
        type: [String],
        required: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);