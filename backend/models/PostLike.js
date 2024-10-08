const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postLikeSchema = new Schema(
  {
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PostLike", postLikeSchema);