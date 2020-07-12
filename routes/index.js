var express = require('express');
var router = express.Router();
const passport = require("passport");
const request = require("request");
const ModelData = require('../models/postModel');
const submitRouter = require("./submitRouter");
const commentRouter = require("./commentRouter");
const jobRouter = require("./jobRouter");
const askRouter = require("./askRouter");
const pastRouter = require("./pastRouter");


// const apiRouter = require("./api");
// router.use('/createApi', apiRouter);

router.use('/submit', submitRouter);
router.use('/comment', commentRouter);
router.use('/job', jobRouter);
router.use('/ask', askRouter);
router.use('/past', pastRouter);






// ================Passport route For Auth ============================

router.get("/login", passport.authenticate('github'))

router.get("/auth", passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/loginfailed'
}))

router.get("/logout", (req, res, next) => {
  req.logout();
  console.log("after logout() call");
  console.log(req.user);
  res.redirect("/");
})

// ===================================================================


/* GET home page. */
router.get('/', function (req, res, next) {
  let userName = 'undefined';
  if (req.user && req.user !== {}) {
    userName = req.user.displayName;
  }
  ModelData.Post.find({}, (error, result) => {
    res.render('index', { userDisplayName: `${userName}`, parsedData: result });
  })
});

router.get('/vote/:post_id',function(req,res,next) {
  if(req.query.voter == "undefined"){
    res.render('loginPlease', { userDisplayName: `undefined`, label: "Vote" })
  } else {
    const post_id = req.params.post_id;
    ModelData.Post.findById(post_id)
    .exec((error, result) => {
      let voterPosition = result.vote.indexOf(req.query.voter);
      if(voterPosition > -1) {
        result.vote.splice(voterPosition, 1);
        result.save ((err)=> {
          err ? res.send("you have some error", err) : res.redirect("/");
        })
      } else {
        console.log(result.vote);
        result.vote.push(req.query.voter);
        result.save ((err)=> {
          err ? res.send("you have some error", err) : res.redirect("/");
        })
      }
    })

  }
})





module.exports = router;
