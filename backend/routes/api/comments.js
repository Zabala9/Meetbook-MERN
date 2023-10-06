const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
const { requireUser } = require("../../config/passport");
const validateCommentInput = require('../../validations/comments');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

router.get('/', async (req, res, next) => {
    try{
        const comments = await Comment.find()
                                      .populate("author", "_id name lastname profileImageUrl")
                                      .sort({ createdAt: -1 });
        const commentsObj = {};
        comments.forEach((comment) => {
            commentsObj[comment._id] = comment;
        });
        return res.json(commentsObj);
    } catch(err){
        return res.json([]);
    }
});

router.get('/:postId', async (req, res, next) => {
    const id = req.params.postId;
    try{
        const comments = await Comment.find({ parentPost: id })
                                      .populate("parentPost", "id post")
                                      .populate("author", "_id name lastname profileImageUrl")
                                      .sort({ createdAt: -1 });
        const commentsObj = {};
        comments.forEach((comment) => {
            commentsObj[comment._id] = comment;
        });
        return res.json(commentsObj);
    } catch(err){
        return res.json([]);
    }
});

router.post('/', singleMulterUpload("image"), requireUser, validateCommentInput, async (req, res, next) => {
    const { parentPost, image, text } = req.body;
    let imageUrl;
    
    if(req.file) imageUrl = await singleFileUpload({ file: image, public: true });

    try {
        const newComment = new Comment({
            text: text,
            imageUrl: imageUrl,
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

router.patch('/:id', singleMulterUpload("image"), requireUser, validateCommentInput, async (req, res, next) => {
    try {
        let newCommentImg;
        const { text, imageUrl, author, _id } = req.body;
        let comment = await Comment.findById(_id);
        console.log(comment, 'find');

        if(!comment) return res.status(404).json({ message: 'Comment not found.' });
        if(!comment.author.equals(req.user._id)) {
            return res.status(403).json({ message: 'You are not authorized to edit this comment.' });
        }
        if(req.file) newCommentImg = await singleFileUpload({ file: req.file, public: true });

        comment.text = text;
        comment.author = author;
        if(req.file){
            comment.imageUrl = newCommentImg;
        } else { comment.imageUrl = imageUrl }

        comment = await comment.save();
        comment = await comment.populate("author", "_id name lastname profileImageUrl");

        return res.json(comment);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', requireUser, async(req, res, next) => {
    try{
        const comment = await Comment.deleteOne({ _id: req.params.id });
        if (!comment) return res.status(404).json({ message: 'Comment not found.' });

        return res.status(204).json('Comment successfully deleted.');
    } catch (err){
        next(err);
    };
});

module.exports = router;