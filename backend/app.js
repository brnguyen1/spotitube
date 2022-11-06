var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var sessions = require('express-session')

var indexRouter = require('./routes/index');
var spotifyRouter = require('./routes/spotify');
var youtubeRouter = require('./routes/youtube');

var app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    cookie: {
        maxAge: oneDay,
        httpOnly: false
    },
}));

app.use('/', indexRouter);
app.use('/callback', spotifyRouter);
app.use('/youtube', youtubeRouter);

module.exports = app;
