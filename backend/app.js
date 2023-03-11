var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var sessions = require('cookie-session')

var app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Router
var spotifyRouter = require('./routes/spotify');
var youtubeRouter = require('./routes/youtube');

app.use('/spotify', spotifyRouter);
app.use('/youtube', youtubeRouter);

module.exports = app;
