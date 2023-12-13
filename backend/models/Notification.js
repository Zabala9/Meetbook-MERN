const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        parentPost: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        notificationType: {
            type: String,
            enum: ['comment', 'like', 'visit', 'request'],
            require: true
        },
        description: {
            type: String,
            require: true,
        },
        read: {
            type: Boolean,
            default: false,
        }
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model("Notification", notificationSchema);