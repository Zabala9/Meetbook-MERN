import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors';
import posts from './posts';
import comments from './comments';
import postLikes from './postLikes';
import notifications from './notifications';
import savePosts from './savePosts';
import search from './search';
import friendRequests from './friendRequests';

const rootReducer = combineReducers({
  session,
  posts,
  comments,
  postLikes,
  notifications,
  savePosts,
  search,
  friendRequests,
  errors
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;