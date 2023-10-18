const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const PostLike = mongoose.model("PostLike");

router.get('/', async (req, res, next) => {
    try{
        const postLikes = await PostLike.find()
                                        .populate("author", "id name lastname profileImageUrl")
                                        .sort({ createdAt: -1 });
        const postLikesObj = {};
        postLikes.forEach((postLike) => {
            postLikesObj[postLike._id] = postLike;
        });
        return res.json(postLikesObj);
    } catch(err){
        return res.json([]);
    }
});

router.get('/:postId', async(req, res, next) => {
    const { postId } = req.params;
    // const { authorId } = req.body;

    try{
        
        const likes = await PostLike.find({ postId: postId })
                                    .populate("postId", "_id")
                                    .populate("authorId", "_id name lastname")
                                    .sort({ createdAt: -1 });
        const likesObj = {};
        likes.forEach((like) => {
            likesObj[like._id] = like;
        });
        return res.json(likesObj);
    } catch(err){
        next(err);
    }
});

router.post('/', requireUser, async(req, res, next) => {
    const { postId } = req.body;

    try{
        const newPostLike = new PostLike({
            author: req.user._id,
            postId: postId,
        });

        let like = await newPostLike.save();
        like = await like.populate("author", "_id name lasname profileImageUrl");
        return res.json(like);
    } catch(err){
        next(err);
    }
});

router.delete('/:id', requireUser, async(req, res, next) => {
    try{
        const postLike = await PostLike.deleteOne({ _id: req.params.id });
        if(!postLike) return res.status(404).json({ message: 'Post like not found.'});

        return res.status(204).json('Post like successfully deleted.');
    } catch(err){
        next(err);
    }
});

module.exports = router;