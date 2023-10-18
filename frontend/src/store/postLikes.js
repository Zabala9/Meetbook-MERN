import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_ALL_POST_LIKES = "postLikes/RECEIVE_ALL_POST_LIKES";
const RECEIVE_POST_LIKE = "postLikes/RECEIVE_POST_LIKE";
const RECEIVE_POST_LIKES = "postLikes/RECEIVE_POSTS_LIKES";
const RECEIVE_NEW_POST_LIKE = "postLikes/RECEIVE_NEW_POST_LIKE";
const RECEIVE_POST_LIKE_ERRORS = "postLikes/RECEIVE_POST_LIKE_ERRORS";
const CLEAR_POST_LIKE_ERRORS = "postLikes/RECEIVE_POST_LIKE_ERRORS";
const REMOVE_POST_LIKE = "postLikes/REMOVE_POST_LIKE";

const receiveAllPostLikes = postLikes => ({
    type: RECEIVE_ALL_POST_LIKES,
    postLikes
});

const receivePostLike = postLike => ({
    type: RECEIVE_POST_LIKE,
    postLike
});

const receivePostLikes = postLikes => ({
    type: RECEIVE_POST_LIKES,
    postLikes
});

const receiveNewPostLike = postLike => ({
    type: RECEIVE_NEW_POST_LIKE,
    postLike
});

const removePostLike = postLikeId => ({
    type: REMOVE_POST_LIKE,
    postLikeId
});

const receiveErrors = errors => ({
    type: RECEIVE_POST_LIKE_ERRORS,
    errors
});

export const clearPostLikesErrors = errors => ({
    type: CLEAR_POST_LIKE_ERRORS,
    errors
});

export const fetchAllPostLikes = () => async dispatch => {
    try{
        const res = await jwtFetch('/api/postLikes/');
        const postLikes = await res.json();
        dispatch(receiveAllPostLikes(postLikes));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const fetchPostLikes = (postId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/postLikes/${postId}`);
        const postLikes = await res.json();
        dispatch(receivePostLikes(postLikes));
    } catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const createPostLike = (postLikeInfo) => async dispatch => {

    try{
        const res = await jwtFetch('/api/postLikes/', {
            method: "POST",
            body: JSON.stringify(postLikeInfo)
        });
        const postLike = await res.json();
        dispatch(receiveNewPostLike(postLike));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

export const deletePostLike = (postLikeId) => async dispatch => {
    try{
        await jwtFetch(`/api/postLikes/${postLikeId}`, {
            method: 'DELETE',
        });
        dispatch(removePostLike(postLikeId));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

const nullErrors = null;

export const postLikeErrorsReducer = (state = nullErrors, action) => {
    switch(action.type){
        case RECEIVE_POST_LIKE_ERRORS:
            return null;
        case RECEIVE_NEW_POST_LIKE:
        case CLEAR_POST_LIKE_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const postLikesReducer = (state = { all: {}, user: [], new: undefined }, action) => {
    switch(action.type){
        case RECEIVE_ALL_POST_LIKES:
            return {...state, all: action.postLikes, new: undefined };
        case RECEIVE_POST_LIKES:
            return {...state, all: action.postLikes, new: undefined };
        case REMOVE_POST_LIKE:
            const newState = {...state};
            delete newState.all[action.postLikeId];
            return {...newState, user: [], new: undefined };
        case RECEIVE_NEW_POST_LIKE:
            return {...state, all: { [action.postLike._id]: action.postLike, ...state.all }};
        case RECEIVE_USER_LOGOUT:
            return {...state, user: [], new: undefined };
        default:
            return state;
    }
};

export default postLikesReducer;