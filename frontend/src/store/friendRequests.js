import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_USER_FRIEND_REQUESTS = "friendRequests/RECEIVE_FRIEND_REQUESTS";
const RECEIVE_USER_FRIEND_REQUESTS_SENT = "friendRequests/RECEIVE_USER_FRIEND_REQUESTS_SENT";
const RECEIVE_FRIEND_REQUEST = "friendRequests/RECEIVE_FRIEND_REQUEST";
const RECEIVE_NEW_FRIEND_REQUEST = "friendRequests/RECEIVE_NEW_FRIEND_REQUEST";
const RECEIVE_FRIEND_REQUEST_ERRORS = "friendRequests/RECEIVE_FRIEND_REQUEST_ERRORS";
const REMOVE_FRIEND_REQUEST = "friendRequests/REMOVE_FRIEND_REQUEST";
const REMOVE_FRIEND_REQUEST_SENT = "friendRequests/REMOVE_FRIEND_REQUEST_SENT";
const CLEAR_FRIEND_REQUEST_ERRORS = "friendRequests/CLEAR_FRIEND_REQUEST_ERRORS";

const receiveUserFriendRequests = friendRequests => ({
    type: RECEIVE_USER_FRIEND_REQUESTS,
    friendRequests
});

const receiveUserFriendRequestsSent = friendRequests => ({
    type: RECEIVE_USER_FRIEND_REQUESTS_SENT,
    friendRequests
});

// update
const receiveFriendRequest = friendRequest => ({
    type: RECEIVE_FRIEND_REQUEST,
    friendRequest
});

// create
const receiveNewFriendRequest = friendRequest => ({
    type: RECEIVE_NEW_FRIEND_REQUEST,
    friendRequest
});

const removeFriendRequest = friendRequestId => ({
    type: REMOVE_FRIEND_REQUEST,
    friendRequestId
});

const removeFriendRequestSent = friendRequestId => ({
    type: REMOVE_FRIEND_REQUEST_SENT,
    friendRequestId
});

const receiveErrors = errors => ({
    type: RECEIVE_FRIEND_REQUEST_ERRORS,
    errors
});

export const clearNotificationErrors = errors => ({
    type: CLEAR_FRIEND_REQUEST_ERRORS,
    errors
});

export const fetchFriendRequests = (userId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/friendRequests/${userId}`);
        const friendRequests = await res.json();
        dispatch(receiveUserFriendRequests(friendRequests));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const fetchFriendRequestsSent = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/friendRequests/sent/${userId}`);
        const friendRequests = await res.json();
        dispatch(receiveUserFriendRequestsSent(friendRequests));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const createFriendRequest = (friendRequestInfo) => async dispatch => {
    try{
        const res = await jwtFetch('/api/friendRequests', {
            method: "POST",
            body: JSON.stringify(friendRequestInfo)
        });
        const friendRequest = await res.json();
        dispatch(receiveNewFriendRequest(friendRequest));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

// update

export const deleteFriendRequest = (friendRequestId) => async dispatch => {
    try{
        await jwtFetch(`/api/friendRequests/${friendRequestId}`, {
            method: 'DELETE',
        });
        dispatch(removeFriendRequest(friendRequestId));
    } catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

export const deleteFriendRequestSent = (friendRequestId, userNotificationId) => async dispatch => {
    try {
        await jwtFetch(`/api/friendRequests/${friendRequestId}/${userNotificationId}`, {
            method: 'DELETE',
        });
        dispatch(removeFriendRequestSent(friendRequestId));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

const nullErrors = null;

export const friendRequestErrorReducer = (state = nullErrors, action) => {
    switch(action.type){
        case RECEIVE_FRIEND_REQUEST_ERRORS:
            return null;
        case RECEIVE_NEW_FRIEND_REQUEST:
        case CLEAR_FRIEND_REQUEST_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const friendRequestsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    let newState;
    switch(action.type){
        case RECEIVE_USER_FRIEND_REQUESTS:
            return {...state, all: action.friendRequests, new: undefined };
        case RECEIVE_USER_FRIEND_REQUESTS_SENT:
            return {...state, user: action.friendRequests, new: undefined };
        case RECEIVE_FRIEND_REQUEST: // update
            return { ...state, all: {...state.all, [action.friendRequest._id] : action.friendRequest }};
        case REMOVE_FRIEND_REQUEST_SENT:
            newState = {...state};
            delete newState.user[action.friendRequestId];
            return {...newState, user: {...newState.user}, new: undefined};
        case REMOVE_FRIEND_REQUEST:
            newState = {...state};
            delete newState.all[action.friendRequestId];
            return {...newState, user: {...newState.user}, new: undefined};
        case RECEIVE_NEW_FRIEND_REQUEST:
            return {...state, user: { [action.friendRequest._id]: action.friendRequest, ...state.user } };
        case RECEIVE_USER_LOGOUT:
            return {...state, new: undefined };
        default:
            return state;
    }
};

export default friendRequestsReducer;
