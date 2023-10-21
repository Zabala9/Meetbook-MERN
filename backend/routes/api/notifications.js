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