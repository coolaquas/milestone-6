var express = require('express');
var router = express.Router();


router.get("/", (req, res, next) => {
  let userName = 'undefined';
  if (req.user && req.user !== {}) {
    userName = req.user.displayName;
  }

  res.render('work_in_progress', { userDisplayName: `${userName}` });
})

module.exports = router;