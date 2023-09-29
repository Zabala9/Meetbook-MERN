const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        parentPost: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        text: {
            type: String,
            require: true,
        },
        imageUrl: {
            type: [String],
            require: false,
        },
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", commentsSchema);