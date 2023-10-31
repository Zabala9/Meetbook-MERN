import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_USER_SAVE_POSTS = "savePosts/RECEIVE_USER_SAVE_POSTS";
const RECEIVE_NEW_SAVE_POST = "savePosts/RECEIVE_NEW_SAVE_POST";
const RECEIVE_SAVE_POST_ERRORS = "savePosts/RECEIVE_SAVE_POST_ERRORS";
const CLEAR_SAVE_POST_ERRORS = "savePosts/CLEAR_SAVE_POST_ERRORS";
const REMOVE_SAVE_POST = "savePosts/REMOVE_SAVE_POST";

const receiveUserSavePosts = savePosts => ({
    type: RECEIVE_USER_SAVE_POSTS,
    savePosts
});

const receiveNewSavePost = savePost => ({
    type: RECEIVE_NEW_SAVE_POST,
    savePost
});

const removeSavePost = savePostId => ({
    type: REMOVE_SAVE_POST,
    savePostId
});

const receiveErrors = errors => ({
    type: RECEIVE_SAVE_POST_ERRORS,
    errors
});

export const clearSavePostErrors = errors => ({
    type: CLEAR_SAVE_POST_ERRORS,
    errors
});

export const fetchSavePost = (userId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/savePosts/${userId}`);
        const savePosts = await res.json();
        dispatch(receiveUserSavePosts(savePosts));
    } catch(err){
        const resBody = await err.json();
        if(resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

export const createSavePost = (savePostInfo) => async dispatch => {
    try{
        const res = await jwtFetch('/api/savePosts/', {
            method: "POST",
            body: JSON.stringify(savePostInfo)
        });
        const savePost = await res.json();
        dispatch(receiveNewSavePost(savePost));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

export const deleteSavePost = (savePostId) => async dispatch => {
    try{
        await jwtFetch(`/api/savePosts/${savePostId}`, {
            method: 'DELETE',
        });
        dispatch(removeSavePost(savePostId));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

const nullErrors = null;

export const savePostErrorsReducer = (state = nullErrors, action) => {
    switch(action.type){
        case RECEIVE_SAVE_POST_ERRORS:
            return null;
        case RECEIVE_NEW_SAVE_POST:
        case CLEAR_SAVE_POST_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const savePostsReducer = (state = { all: {}, new: undefined }, action) => {
    switch(action.type){
        case RECEIVE_USER_SAVE_POSTS:
            return {...state, all: action.savePosts, new: undefined };
        case REMOVE_SAVE_POST:
            const newState = {...state};
            delete newState.all[action.savePostId];
            return {...newState, user: {}, new: undefined };
        case RECEIVE_NEW_SAVE_POST:
            return {...state, all: { [action.savePost._id]: action.savePost, ...state.all }};
        case RECEIVE_USER_LOGOUT:
            return {...state, user: {}, new: undefined };
        default:
            return state;
    }
};

export default savePostsReducer;