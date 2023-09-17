const { body, validationResult } = require('express-validator');
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

exports.post_create_post = [
    body("author")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("title")
        .trim()
        .isLength({ min: 8 })
        .escape(),
    body("content")
        .trim()
        .isLength({ min: 40 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            author: req.body.author,
            title: req.body.title,
            content: req.body.content,
            date_added: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString(),
            image: req.body.image,
            comments: []
        })

        if(!errors.isEmpty()) {
            return;
        }
        else {
            const postExists = await Post.findOne({ title: req.body.title });
    
            if(postExists) {
                return;
            }
            else {
                await post.save();
            }
        }
    })
]