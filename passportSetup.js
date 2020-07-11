const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;




// passport.serializeUser((user,cb)=>{
//     cb(null,user);
//   })
//   passport.deserializeUser((user,cb)=>{
//     cb(null,user);
//   })



passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "https://samrat-news.herokuapp.com/auth"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));