const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model("User");
// const Post = mongoose.model("Post");
const Notification = mongoose("Notification");
const { requireUser } = require("../../config/passport");

router.get('/userId', async (req, res, next) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
                                                .populate("author", "_id name lastname profileImageUrl")
                                                .populate("parentPost", "id")
                                                .sort({ createdAt: -1 });
        const notificationsObj = {};
        notifications.forEach((notification) => {
            notificationsObj[notification._id] = notification;
        });
        return res.json(notificationsObj);
    } catch (err) {
        return res,json([]);
    }
});

router.post('/', requireUser, async (req, res, next) => {
    const { parentPost, recipient, description } = req.body;

    try{
        const newNotification = new Notification({
            author: req.user._id,
            parentPost: parentPost,
            recipient: recipient,
            description: description,
        });

        let notification = await newNotification.save();
        notification = await notification.populate("author", "_id name lastname profileImageUrl");
        return res.json(notification);
    } catch (err){
        next(err);
    }
});