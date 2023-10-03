import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_ALL_COMMENTS = "comments/RECEIVE_ALL_COMMENTS";
const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_NEW_COMMENT = "comments/RECEIVE_NEW_COMMENT";
const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const receiveAllComments = comments => ({
    type: RECEIVE_ALL_COMMENTS,
    comments
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
    console.log(commentInfo, 'comment Info front');
    const { text, image, parentPost, authorId } = commentInfo;
    const formData = new FormData();
    formData.append("text", text);
    formData.append("parentPost", parentPost);
    formData.append("authorId", authorId);
    if(image) formData.append("image", image);

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

// update

// delete

const nullErrors = null;

export const postErrorsReducer = (state = nullErrors, action) => {
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
    let filteredUserComments;
    switch(action.type){
        case RECEIVE_ALL_COMMENTS:
            return {...state, all: action.comments, new: undefined };
        case RECEIVE_COMMENTS:
            return { ...state, all: action.comments, new: undefined };
        case REMOVE_COMMENT:
            filteredUserComments = state.user.filter(userComment => {
                return userComment._id.toString() !== action.commentId.toString();
            });
            const newState = {...state};
            delete newState.all[action.commentId];
            return {...newState, user: filteredUserComments, new: undefined };
        case RECEIVE_NEW_COMMENT:
            // const mapppedUserComments = state.user.map(userComment => {
            //     return userComment;
            // })
            // return { ...state, new: action.comments, user: mapppedUserComments };
            return {...state, all: {...state.all, [action.comment._id]: action.comment }};
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: [], new: undefined };
        default:
            return state;
    }
};

export default commentReducer;