const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const FriendRequest = mongoose.model('FriendRequest');
const Notification = mongoose.model('Notification');
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
        const friendRequests = await FriendRequest.find({ receiver: user._id })
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

router.get('/sent/:userId', async (req, res, next) => {
    try {
        const friendRequestsSent = await FriendRequest.find({
            requester: req.params.userId,
            status: 'pending'
        }).populate("receiver", "_id name lastname profileImageUrl");

        const friendRequestsSentObj = {};
        friendRequestsSent.forEach((friendRequest) => {
            friendRequestsSentObj[friendRequest._id] = friendRequest;
        });
        return res.json(friendRequestsSentObj);
    } catch (err) {
        return res.json([]);
    }
});

router.post('/', requireUser, async (req, res, next) => {
    const { receiver, status } = req.body;

    try{
        const newFriendRequest = new FriendRequest({
            requester: req.user._id,
            receiver: receiver,
            status: status
        });

        let friendRequest = await newFriendRequest.save();
        friendRequest = await friendRequest.populate("requester", "_id name lastname profileImageUrl");
        return res.json(friendRequest);
    } catch (err){
        next(err);
    }
});

// patch

router.delete('/:friendRequestId/:userNotificationId', requireUser, async (req, res, next) => {
    try{
        const { userNotificationId } = req.params;
        // console.log(userNotificationId, "userId");
        const { friendRequestId } = req.params;
        const friendRequest = await FriendRequest.deleteOne({ _id: friendRequestId });
        if (!friendRequest) return res.status(404).json({ message: 'Friend request not found.' });

        const notification = await Notification.findOne({ author: req.user._id, recipient: userNotificationId, notificationType: 'request' });
        if (notification) { await Notification.deleteOne({ _id: notification._id }) };

        return res.status(204).json('Friend request successfully deleted.');
    } catch (err) {
        next(err);
    }
});

module.exports = router;