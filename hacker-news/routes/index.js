var express = require('express');
var router = express.Router();
const passport = require("passport");
const request = require("request");
const ModelData = require('../models/postModel');
const submitRouter = require("./submitRouter");
const commentRouter = require("./commentRouter");
// const apiRouter = require("./api");
// const Comments = require('../models//commentModel');

// router.use('/createApi', apiRouter);
router.use('/submit', submitRouter);
router.use('/comment', commentRouter);



// ================Passport route For Auth ============================

router.get("/login", passport.authenticate('github'))

router.get("/auth", passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/loginfailed'
}))

router.get("/logout", (req, res, next) => {
  res.json({ msg: "Work In Progress" });
  // req.user = {};
  // res.redirect("/");
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






module.exports = router;
