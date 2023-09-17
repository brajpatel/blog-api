const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

exports.posts_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().exec();

    res.json(allPosts);
});

exports.post_detail = asyncHandler(async (req, res, next) => {
    const selectedPost = await Post.find(req.params.id).populate("comments").exec();

    res.json(selectedPost);
});

exports.post_create_post = asyncHandler(async (req, res, next) => {
    const post = new Post({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        date_added: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString(),
        image: req.body.image,
        comments: []
    })
    
    const postExists = await Post.findOne({ title: req.body.title });

    if(postExists) {
        return;
    }
    else {
        await post.save();
    }
});