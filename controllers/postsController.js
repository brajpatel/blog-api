const Posts = require('../models/post');
const asyncHandler = require('express-async-handler');

exports.posts_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Posts.find().exec();

    res.json(allPosts);
});

exports.post_detail = asyncHandler(async (req, res, next) => {
    const selectedPost = await Posts.find(req.params.id).populate("comments").exec();

    res.json(selectedPost);
});