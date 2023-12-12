const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require("../../config/passport");
const Notification = mongoose.model("Notification");

router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ recipient: userId })
                                                .populate("author", "_id name lastname profileImageUrl")
                                                .populate("parentPost", "_id")
                                                .sort({ createdAt: -1 });
        const notificationsObj = {};
        notifications.forEach((notification) => {
            notificationsObj[notification._id] = notification;
        });
        return res.json(notificationsObj);
    } catch (err) {
        return res.json([]);
    }
});

router.post('/', requireUser, async (req, res, next) => {
    const { parentPost, recipient, description } = req.body;

    try{
        let newNotification;

        if (parentPost) {
            newNotification = new Notification({
                author: req.user._id,
                parentPost: parentPost,
                recipient: recipient,
                description: description,
            });
        } else {
            newNotification  = new Notification({
                author: req.user._id,
                recipient: recipient,
                description: description,
            });
        }

        let notification = await newNotification.save();
        notification = await notification.populate("author", "_id name lastname profileImageUrl");
        return res.json(notification);
    } catch (err){
        next(err);
    }
});

router.patch('/:notificationId', requireUser, async (req, res, next) => {
    try{
        const { notificationId } = req.params;
        const { read } = req.body;
        let notification = await Notification.findById(notificationId);

        if(!notification) return res.status(404).json({ message: 'Notification not found.' });
        
        notification.read = read;
        notification = await notification.save();
        notification = await notification.populate("author", "_id name lastname profileImageUrl");
        return res.json(notification);
    } catch (err){
        next(err);
    }
});

router.delete('/:notificationId', requireUser, async(req, res, next) => {
    try{
        const { notificationId } = req.params;
        const notification = await Notification.deleteOne({ _id: notificationId });
        if(!notification) return res.status(404).json({ message: 'Notification not found.' });

        return res.status(204).json('Notification successfully deleted.');
    } catch(err){
        next(err);
    }
});

module.exports = router;