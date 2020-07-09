var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Posts = require('../models/postModel');


//Mongoose Connection


router.get('/:post_id', (req, res, next) => {
    let newComment = new Comments;
    newComment.parent = parseInt(req.params.post_id);
    Comments.create(newComment,(error,result)=>{
        res.render()
    })

})    
router.get('/view', (req, res, next) => {
    Posts.find({}, (error, result) => {
        res.json(result);
    })
})


module.exports = router;