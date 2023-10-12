const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const PostLike = mongoose.model("PostLike");

// funtion to return total number of votes

// async function totalLikes(postId) {
//     try{
//         let allPostLikes = await PostLike.find({ postId }).exec();
//         let totalLikesCount = 0;

//         for(let i = 0; i < allPostLikes.length; i++){
//             totalLikesCount += allPostLikes[i].like;
//         }
//         return {likeTotal: totalLikesCount};
//     } catch (err) {
//         console.log(err);
//     }
// };

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
    const { parentPostId } = req.body;

    try{
        const newPostLike = new PostLike({
            authorId: req.user._id,
            postId: parentPostId,
        });

        let like = await newPostLike.save();
        like = await like.populate("author", "_id name lasname profileImageUrl");
        return res.json(like);
    } catch(err){
        next(err);
    }
});

module.exports = router;