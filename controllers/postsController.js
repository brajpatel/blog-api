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

exports.post_create_post = [];