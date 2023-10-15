import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_ALL_COMMENTS = "comments/RECEIVE_ALL_COMMENTS";
const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";
const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_NEW_COMMENT = "comments/RECEIVE_NEW_COMMENT";
const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const receiveAllComments = comments => ({
    type: RECEIVE_ALL_COMMENTS,
    comments
});

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT,
    comment
});

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

const receiveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const clearCommentErrors = errors => ({
    type: CLEAR_COMMENT_ERRORS,
    errors
});

export const fetchAllComments = () => async dispatch => {
    try{
        const res = await jwtFetch('/api/comments/');
        const comments = await res.json();
        dispatch(receiveAllComments(comments));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const fetchComments = (postId) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/comments/${postId}`);
        const comments = await res.json();
        dispatch(receiveComments(comments));
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

export const createComment = (commentInfo) => async dispatch => {
    const { text, images, parentPost } = commentInfo;
    const formData = new FormData();
    formData.append("text", text);
    formData.append("parentPost", parentPost);
    if(images) formData.append("image", images);

    try {
        const res = await jwtFetch('/api/comments/', {
            method: "POST",
            body: formData
        });
        const comment = await res.json();
        dispatch(receiveNewComment(comment));
        return comment;
    } catch(err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

export const updateComment = (data) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/comments/${data._id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        const comment = await res.json();
        dispatch(receiveComment(comment));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) return dispatch(receiveErrors(resBody.errors));
    }
};

export const deleteComment = (commentId) => async dispatch => {
    try{
        await jwtFetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });
        dispatch(removeComment(commentId));
    } catch (err){
        const resBody = await err.json();
        if (resBody.statusCode === 400) dispatch(receiveErrors(resBody.errors));
    }
};

const nullErrors = null;

export const commentErrorsReducer = (state = nullErrors, action) => {
    switch(action.type){
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case RECEIVE_NEW_COMMENT:
        case CLEAR_COMMENT_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const commentReducer = (state ={ all: {}, user: [], new: undefined }, action) => {
    switch(action.type){
        case RECEIVE_ALL_COMMENTS:
            return {...state, all: action.comments, new: undefined };
        case RECEIVE_COMMENT:
            return {...state, all: {...state.all, [action.comment._id]: action.comment }};
        case RECEIVE_COMMENTS:
            return { ...state, all: action.comments, new: undefined };
        case REMOVE_COMMENT:
            const newState = {...state };
            delete newState.all[action.commentId];
            return {...newState, user: [], new: undefined };
        case RECEIVE_NEW_COMMENT:
            return {...state, all: { [action.comment._id]: action.comment, ...state.all }};
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: [], new: undefined };
        default:
            return state;
    }
};

export default commentReducer;