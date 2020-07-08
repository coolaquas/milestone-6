const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var commentSchema = new Schema({
    commnet_id: Number,
    by: String,
    parent: Number,
    body: String,
    comment_creation: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;