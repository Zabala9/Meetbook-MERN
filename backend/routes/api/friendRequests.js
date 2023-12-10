const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const FriendRequest = mongoose.model('FriendRequest');
const { requireUser } = require('../../config/passport');

router.get('/:userId', async (req, res, next) => {
    let user;
    try{
        user = await User.findById(req.params.userId);
    } catch(err){
        const error = new Error('User not found.');
        error.statusCode = 404;
        error.errors = { message: 'No user found with that id.' };
        return next(error);
    }

    try{
        const friendRequests = await FriendRequest.find({ requester: user._id })
                                                  .sort({ createdAt: -1 })
                                                  .populate("requester", "_id name lastname profileImageUrl")
                                                  .populate("receiver", "_id name lastname profileImageUrl");
        const friendRequestsObj = {};
        friendRequests.forEach((friendRequest) => {
            friendRequestsObj[friendRequest._id] = friendRequest;
        });
        return res.json(friendRequestsObj);
    } catch(err) {
        return res.json([]);
    }
});