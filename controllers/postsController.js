const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

exports.posts_list = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().exec();

    if(!posts) {
        return res.status(404).json({ err: "No posts were found" });
    }
    
    res.status(200).json(posts);
});

exports.post_detail = asyncHandler(async (req, res, next) => {
    const selectedPost = await Post.findById(req.params.id).populate("comments").exec();

    if(!selectedPost) {
        res.status(404).json({ err: "Post could not be found" })
    }

    res.status(200).json(selectedPost);
});

exports.post_create = asyncHandler(async (req, res, next) => {
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

exports.post_add_comment = [
    body("name")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("message")
        .trim()
        .isLength({ min: 20 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationRequest(req);

        const comment = new Comment({
            user: req.body.user,
            message: req.body.message,
            date_added: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString(),
            post: req.params.id
        })

        if(!errors.isEmpty()) {
            return;
        }
        else {
            const post = Post.findById(req.params.id).populate("comments").exec();

            const updatedPost = new Post({
                author: post.author,
                title: post.title,
                content: post.content,
                date_added: post.date_added,
                image: post.image,
                comments: [...post.comments, comment],
                _id: req.params.id
            })

            await comment.save();
            await Post.findByIdAndUpdate(req.params.id, updatedPost, {});
        }
    })
];