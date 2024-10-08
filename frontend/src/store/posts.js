import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const RECEIVE_POST = "posts/RECEIVE_POST";
const RECEIVE_USER_POSTS = "posts/RECEIVE_USER_POSTS";
const RECEIVE_NEW_POST = "posts/RECEIVE_NEW_POST";
const RECEIVE_POST_ERRORS = "posts/RECEIVE_POST_ERRORS";
const REMOVE_POST = "posts/REMOVE_POST";
const CLEAR_POST_ERRORS = "posts/CLEAR_POST_ERRORS";

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

const receiveUserPosts = posts => ({
    type: RECEIVE_USER_POSTS,
    posts
});

const removePost = postId => ({
    type: REMOVE_POST,
    postId
});

const receiveNewPost = post => ({
    type: RECEIVE_NEW_POST,
    post
});

const receiveErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
});

export const clearPostErrors = errors => ({
    type: CLEAR_POST_ERRORS,
    errors
});

export const fetchPosts = () => async dispatch => {
    try{
        const res = await jwtFetch('/api/posts');
        const posts = await res.json();
        dispatch(receivePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchPost = (postId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/posts/${postId}`);
        const post = await res.json();
        dispatch(receivePost(post));
    } catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const fetchUserPosts = id => async dispatch => {
    try{
        const res = await jwtFetch(`/api/posts/user/${id}`);
        const posts = await res.json();
        dispatch(receiveUserPosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const createPost = (postInfo) => async dispatch => {
    const { text, images, privacy } = postInfo;
    const formData = new FormData();
    formData.append("text", text);
    formData.append("privacy", privacy);
    if (images) {
        Array.from(images).forEach(image => formData.append("images", image));
    }

    try{
        const res = await jwtFetch('/api/posts/', {
            method: "POST",
            body: formData
        });
        const post = await res.json();
        dispatch(receiveNewPost(post));
        return post;
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const updatePost = data => async dispatch => {
    try{
        const res = await jwtFetch(`api/posts/${data._id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        const post = await res.json();
        dispatch(receivePost(post));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deletePost = (postId) => async dispatch => {
    try{
        await jwtFetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        });
        dispatch(removePost(postId));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

const nullErrors = null;

export const postErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors;
        case RECEIVE_NEW_POST:
        case CLEAR_POST_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const postsReducer = (state = { all: {}, user: [], new: undefined }, action) => {
    switch(action.type) {
        case RECEIVE_POSTS:
            return { ...state, all: action.posts, new: undefined };
        case RECEIVE_POST:
            return { ...state, all: {...state.all, [action.post._id]: action.post }};
        case REMOVE_POST:
            const newState = {...state};
            delete newState.all[action.postId];
            delete newState.user[action.postId];
            return {...newState };
        case RECEIVE_USER_POSTS:
            return { ...state, user: action.posts, new: undefined };
        case RECEIVE_NEW_POST:
            // const mappedUserPosts = state.user.map(userPost => {
            //     return userPost;
            // })
            return { ...state, all: { [action.post._id]: action.post, ...state.all }};
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: [], new: undefined };
        default:
            return state;
    }
};

export default postsReducer;