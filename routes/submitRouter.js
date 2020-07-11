var express = require('express');
var router = express.Router();
const ModelData = require('../models/postModel');




router.get("/", (req, res, next) => {
  let userName = 'undefined';
  if (req.user && req.user !== {}) {
    userName = req.user.displayName;
  }

  res.render('submit', { userDisplayName: `${userName}` });
})


router.post("/createPost", (req, res, next) => {
  if (req.user == []) {
    const myPostFormData = {
      title: req.body.title,
      URL: req.body.URL,
      vote: 0,
      type: "Post",
      by: req.user.displayName,
      body: req.body.body,
      hidden: false
    }
    let Data = ModelData.Post(myPostFormData);
    Data.save((err) => {
      err ? res.send("you have some error", err) : res.redirect("/");
    })
  } else {
    let userName = 'undefined';
    if (req.user && req.user !== {}) {
      userName = req.user.displayName;
    }
    res.render('loginPlease', { userDisplayName: `${userName}`, label: "POST" })
  }
})

module.exports = router;