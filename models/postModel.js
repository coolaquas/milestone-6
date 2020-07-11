const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var commentSchema = new Schema ({
    by: String,
    type: String,
    parent: String,
    body: String,
    comment_creation: { type: Date, default: Date.now }
})


var postSchema = new Schema({
    title: String,
    URL: String,
    vote: Number,
    type: String,
    by: String,
    post_creation: { type: Date, default: Date.now },
    body: String,
    child: Number,
    comments: [commentSchema],
    hidden: Boolean

});
var userSchema = new Schema({
    githubId: String,
    displayName:String,
    profileUrl:String
});




const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const userData = mongoose.model('userData', userSchema);


module.exports = {
    Post: Post,
    Comment: Comment,
    userData: userData
}