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
        return res.status(404).json({ err: "Post could not be found" })
    }

    res.status(200).json(selectedPost);
});

exports.post_create = asyncHandler(async (req, res, next) => {
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
})

exports.post_add_comment = asyncHandler(async (req, res, next) => {
    const comment = new Comment({
        name: req.body.name,
        message: req.body.message,
        date_added: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString(),
        post: req.params.id
    })

    const postToUpdate = await Post.findById(req.params.id).populate("comments").exec();

    let comments = postToUpdate.comments;

    if(comments.length > 0) {
        comments = [...comments, comment];
    }
    else {
        comments = new Array(comment);
    }

    const updatedPost = new Post({
        author: postToUpdate.author,
        title: postToUpdate.title,
        content: postToUpdate.content,
        date_added: postToUpdate.date_added,
        image: postToUpdate.image,
        comments: comments,
        _id: req.params.id
    })

    await comment.save();
    await Post.findByIdAndUpdate(req.params.id, updatedPost, {});

    const post = await Post.findById(req.params.id).populate("comments").exec();
    
    if(!post) {
        return res.status(404).json({ err: "Post could not be found"});
    }

    return res.status(200).json(post);
})

// {
//     "author": "BRUV",
//     "title": "ANOTHER Postman POST Test",
//     "content": "ANOTHER ANOTHER ANOTHERPostman POST Test testing if this works testPostman POST Test testing if this works testPostman POST Test testing if this works testPostman POST Test testing if this works testPostman BRUV ANA BRUH POST Test testing if this works testPostman POST Test testing if this works testPostman POST Test testing if this works testPostman POST Test testing if this works test",
//     "image": "https://r4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-3be62c2d93012fc995842bf94d4cdc00.jpg"
// }