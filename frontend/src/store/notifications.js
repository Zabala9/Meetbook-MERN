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

export const createNotification = (notificationInfo) => async dispatch => {
    try{
        const res = await jwtFetch('/api/notifications/', {
            method: "POST",
            body: JSON.stringify(notificationInfo)
        });
        const notification = await res.json();
        dispatch(receiveNewNotification(notification));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

export const updateNotification = (data) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/notifications/${data._id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        const notification = await res.json();
        dispatch(receiveNotification(notification));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

const nullErrors = null;

export const notificationErrorsReducer = (state = nullErrors, action) => {
    switch(action.type){
        case RECEIVE_NOTIFICATION_ERRORS:
            return null;
        case RECEIVE_NEW_NOTIFICATION:
        case CLEAR_NOTIFICATION_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const notificationsReducer = (state = { all: {}, user: [], new: undefined }, action) => {
    switch(action.type){
        case RECEIVE_USER_NOTIFICATIONS:
            return {...state, all: action.notifications, new: undefined };
        case RECEIVE_NOTIFICATION:
            return { ...state, all: {...state.all, [action.notification._id]: action.notification }};
        case REMOVE_NOTIFICATION:
            const newState = {...state};
            delete newState.all[action.notificationId];
            return {...newState, user: [], new: undefined };
        case RECEIVE_NEW_NOTIFICATION:
            return {...state, new: action.notification };
        case RECEIVE_USER_LOGOUT:
            return {...state, user: [], new: undefined };
        default:
            return state;
    }
};

export default notificationsReducer;