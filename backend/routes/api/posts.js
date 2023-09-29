const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/posts');
const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");

/* GET posts listing. */
router.get('/', async (req, res, next) => {
  try{
    const posts = await Post.find()
                            .populate("author", "_id name lastname profileImageUrl")
                            .sort({ createdAt: -1 });
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try{
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try{
    const posts = await Post.find({ author: user._id })
                            .sort({ createdAt: -1})
                            .populate("author", "_id name lastname profileImageUrl")
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id)
                           .populate("author", "_id name lastname profileImageUrl")
    return res.json(post)
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});

router.post('/', multipleMulterUpload("images"), requireUser, validatePostInput, async (req, res, next) => {
  const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
  try{
    const newPost = new Post({
      text: req.body.text,
      imageUrls,
      privacy: req.body.privacy,
      author: req.user._id
    });

    let post = await newPost.save();
    post = await post.populate('author', '_id name lastname profileImageUrl');
    return res.json(post);
  }
  catch(err) {
    next(err);
  }
});

router.patch('/:id', multipleMulterUpload("images"), requireUser, validatePostInput, async (req, res, next) => {
  try{
    const { text, privacy, imageUrls, _id } = req.body;
    let post = await Post.findById(_id);

    if (!post) return res.status(404).json({ message: 'Post not found '});
    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'You are not authorized to edit this post.' });
    }
    
    post.text = text;
    post.privacy = privacy;
    post.imageUrls = imageUrls;
    post = await post.save();
    
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async(req, res, next) => {
  try{
    const post = await Post.deleteOne({ _id: req.params.id });
    if(!post) return res.status(404).json({ message: 'Post not found.' });

    return res.status(204).json('Post successfully deleted.');

  } catch (err){
    next(err);
  }
});

module.exports = router;