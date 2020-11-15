var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config();
var sass = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UsersRouter');
var messagesRouter = require('./routes/MessagesRouter');
var activitiesRouter = require('./routes/ActivitiesRouter');
var registerRouter = require('./routes/registration');
var discoverRouter = require('./routes/discover');
var loginRouter = require('./routes/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//sass middleware
app.use(
    sass({
        src: __dirname+'/public/sass',
        dest: __dirname+'/public/css',
        // debug: true,
        indentedSyntax: false,
        prefix: '/css'
    })
    // connect.static(__dirname + '/public')
)

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
    res.locals.username = req.session.username;
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.userId = req.session.userId;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/activities', activitiesRouter);
app.use('/messages', messagesRouter);
app.use('/', registerRouter);
app.use('/discover', discoverRouter);
app.use('/login', loginRouter);

module.exports = app;
