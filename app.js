const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');




var app = express();
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoDBConnection, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("DataBase Connection successful"))
.catch((err)=>console.log(err));

//=======Passport========
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
//=======================



//=========Passport Config ============
app.use(session({
  secret: 'keyboard Sam',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://samrat-news.herokuapp.com/auth"
},
  function (accessToken, refreshToken, profile, cb) {
    return cb (null, profile);
  }
));
passport.serializeUser((user,cb)=>{
  cb(null,user);
})
passport.deserializeUser((user,cb)=>{
  console.log(user);
  cb(null,user);
})

//=====================================

app.use('/', indexRouter);










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
