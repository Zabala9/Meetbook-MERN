import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { postErrorsReducer } from './posts';
import { commentErrorsReducer } from './comments';
import { postLikeErrorsReducer } from './postLikes';
import { notificationErrorsReducer } from './notifications';
import { savePostErrorsReducer } from './savePosts';

export default combineReducers({
    session: sessionErrorsReducer,
    post: postErrorsReducer,
    comment: commentErrorsReducer,
    postLikes: postLikeErrorsReducer,
    notification: notificationErrorsReducer,
    savePost: savePostErrorsReducer,
});