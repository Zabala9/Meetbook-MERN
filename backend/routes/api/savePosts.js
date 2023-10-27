const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const SavePost = mongoose.model("SavePost");

router.get('/:userId', async(req, res, next) => {
    try{
        const { userId } = req.params;
        const savePosts = await SavePost.find({ author: userId })
                                        .populate("author", "_id name lastname profileImageUrl")
                                        .populate("postInformation", "author")
                                        .sort({ createdAt: -1 });
        const savePostsObj = {};
        savePosts.forEach((savePost) => {
            savePostsObj[savePost._id] = savePost;
        });
        return res.json(savePostsObj);
    } catch(err){
        return res.json([]);
    }
});

//

module.exports = router;