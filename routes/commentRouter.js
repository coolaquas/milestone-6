var express = require('express');
var router = express.Router();
const ModelData = require('../models/postModel');

router.get("/", (req, res, next) => {
    let userName = 'undefined';
    if (req.user && req.user !== {}) {
        userName = req.user.displayName;
    }
    ModelData.Post.find({}, (error, result) => {
    res.render('comment', { userDisplayName: `${userName}`, parsedData: result });
    })
})

router.get('/view/:post_id', (req, res, next) => {
    let userName = 'undefined';
    if (req.user && req.user !== {}) {
        userName = req.user.displayName;
    }
    let post_id = req.params.post_id;
    ModelData.Post.findById(post_id)
        .exec((error, result) => {
            res.render('commentView', { userDisplayName: `${userName}`, parsedData: result });
        })
})

router.post('/addComment/:post_id', (req, res, next) => {
    if (req.user) {
        let post_id = req.params.post_id;
        const myCommentFormData = {
            by: req.user.displayName,
            type: "Comment",
            parent: post_id,
            body: req.body.comment,
        }
        let aComment = ModelData.Comment(myCommentFormData);
        aComment.save((error) => {
            console.log(error);
        })

        ModelData.Post.findById(post_id)
            .exec((error, result) => {
                result.comments.push(aComment);
                result.save((err) => {
                    err ? res.send("you have some error", err) : res.redirect("/");
                })
            })

    } else {
        let userName = 'undefined';
        if (req.user && req.user !== {}) {
            userName = req.user.displayName;
        }
        res.render('loginPlease', { userDisplayName: `${userName}`, label: "COMMENT" })
    }
})

module.exports = router;