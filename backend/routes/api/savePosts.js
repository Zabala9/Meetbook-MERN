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
                                        .populate({
                                            path: 'postInformation',
                                            select: 'author _id text imageUrls',
                                            populate: {
                                                path: 'author',
                                                model: 'User',
                                                select: '_id name lastname profileImageUrl'
                                            }
                                        })
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

router.post('/', requireUser, async (req, res, next) => {
    const { postInformation } = req.body;

    try{
        const newSavePost = new SavePost({
            author: req.user._id,
            postInformation: postInformation,
        });

        let savePost = await newSavePost.save();
        savePost = await savePost.populate("author", "_id name lastname profileImageUrl");
                                //  .populate("postInformation", "_id text imageUrls");
        return res.json(savePost);
    } catch (err){
        next(err);
    }
});

router.delete('/:savePostId', requireUser, async(req, res, next) => {
    try{
        const { savePostId } = req.params;
        const savePost = await SavePost.deleteOne({ _id: savePostId });
        if(!savePost) return res.status(404).json({ message: 'Save post not found.' });

        return res.status(204).json('Save post successfully deleted.');
    } catch(err){
        next(err);
    }
});

module.exports = router;