var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
const dotenv = require("dotenv")
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/registration');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'top secret code!',
    path: '/',
    resave: false,
    saveUninitialized: true
}));

// This will make a user variable available in all your templates.
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);

module.exports = app;
