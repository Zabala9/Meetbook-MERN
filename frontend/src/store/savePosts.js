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
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};