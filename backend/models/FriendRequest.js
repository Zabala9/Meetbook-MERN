const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);