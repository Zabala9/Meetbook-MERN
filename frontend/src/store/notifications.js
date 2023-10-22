import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_USER_NOTIFICATIONS = "notifications/RECEIVE_NOTIFICATIONS";
const RECEIVE_NOTIFICATION = "notifications/RECEIVE_NOTIFICATION";
const RECEIVE_NEW_NOTIFICATION = "notifications/RECEIVE_NEW_NOTIFICATION";
const RECEIVE_NOTIFICATION_ERRORS = "notifications/RECEIVE_NOTIFICATION_ERRORS";
const CLEAR_NOTIFICATION_ERRORS = "notifications/CLEAR_NOTIFICATION_ERRORS";
const REMOVE_NOTIFICATION = "notifications/REMOVE_NOTIFICATION";

const receiveUserNotifications = notifications => ({
    type: RECEIVE_USER_NOTIFICATIONS,
    notifications
});

// update
const receiveNotification = notification => ({
    type: RECEIVE_NOTIFICATION,
    notification
});

// create
const receiveNewNotification = notification => ({
    type: RECEIVE_NEW_NOTIFICATION,
    notification
});

const removeNotification = notificationId => ({
    type: REMOVE_NOTIFICATION,
    notificationId
});

const receiveErrors = errors => ({
    type: RECEIVE_NOTIFICATION_ERRORS,
    errors
});

export const clearNotificationErrors = errors => ({
    type: CLEAR_NOTIFICATION_ERRORS,
    errors
});

export const fetchNotifications = (userId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/notifications/${userId}`);
        const notifications = await res.json();
        dispatch(receiveUserNotifications(notifications));
    } catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

