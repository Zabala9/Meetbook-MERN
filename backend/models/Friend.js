const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    friend: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

friendSchema.index({ user: 1, friend: 1 }, { unique: true });

module.exports = mongoose.model("Friend", friendSchema);