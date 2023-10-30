const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savePostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        postInformation: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model("SavePost", savePostSchema);