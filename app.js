const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ModelData = require('./models/postModel');


var app = express();
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//===========MongoDB==================
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoDBConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DataBase Connection successful"))
  .catch((err) => console.log(err));

//=======Passport========

const session = require('cookie-session');
const passport = require("passport");
const { Console } = require('console');
const GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  ModelData.userData.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "https://samrat-news.herokuapp.com/auth"
},
function(accessToken, refreshToken, profile, done) {
  //check user table for anyone with a githubID of profile.id
  ModelData.userData.findOne({
      'githubId': profile.id 
  }, function(err, user) {
      if (err) {
          return done(err);
      }
      //No user was found... so create a new user with values from Github (all the profile. stuff)
      if (!user) {
        const userLoginData = {
                  githubId: profile.id,
                  displayName:profile.displayName,
                  profileUrl:profile.profileUrl
                }
                let Data = ModelData.userData(userLoginData);
                Data.save(function(err) {
                  if (err) console.log(err);
                  return done(err, user);
              });
          } else {
              //found user. Return
              return done(err, user);
          }
      });
  }
));
app.use(cookieSession({
  name: 'hacker-News Session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

//=====================================

app.use('/', indexRouter);







// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
