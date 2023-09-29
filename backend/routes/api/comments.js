const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
const { requireUser } = require("../../config/passport");
const validateCommentInput = require('../../validations/comments');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

router.get('/:postId', async (req, res, next) => {
    const id = req.params.postId;
    try{
        const comments = await Comment.find({ parentPost: id })
                                      .populate("parentPost", "id post")
                                      .populate("author", "_id name lastname profileImageUrl")
                                      .sort({ createdAt: -1 });
        return res.json(comments);
    } catch(err){
        return res.json([]);
    }
});

router.post('/', singleMulterUpload("image"), requireUser, validateCommentInput, async (req, res, next) => {
    // console.log(req.body, 'back');
    const { parentPost, text } = req.body;
    let imageUrl = [];
    
    if(req.file) imageUrl = await singleFileUpload({ file: req.file, public: true });

    try {
        const newComment = new Comment({
            text: text,
            imageUrl,
            parentPost: parentPost,
            author: req.user._id,
        });

        let comment = await newComment.save();
        comment = await comment.populate("author", "_id name lastname profileImageUrl");
        return res.json(comment);
    } catch(err){
        next(err);
    }
});

module.exports = router;