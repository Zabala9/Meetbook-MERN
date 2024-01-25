// require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const debug = require('debug');
const csurf = require('csurf');
const cors = require('cors');
const { isProduction } = require('./config/keys');

require('./models/User');
require('./models/Post');
require('./models/Comment');
require('./models/PostLike');
require('./models/Notification');
require('./models/SavePost');
require('./models/FriendRequest');
require('./config/passport');
const passport = require('passport');

const usersRouter = require('./routes/api/users');
const postsRouter = require('./routes/api/posts');
const commentsRouter = require('./routes/api/comments');
const postLikesRouter = require('./routes/api/postLikes');
const notificationsRouter = require('./routes/api/notifications');
const savePostsRouter = require('./routes/api/savePosts');
const friendRequestsRouter = require('./routes/api/friendRequests');
const csrfRouter = require('./routes/api/csrf');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

// SECURITY MIDDLEWARE
if (!isProduction) {
    app.use(cors());
}

// CSRF TOKEN
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/postLikes', postLikesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/savePosts', savePostsRouter);
app.use('/api/friendRequests', friendRequestsRouter);
app.use('/api/csrf', csrfRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});

module.exports = app;
