const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // redirect to posts
    res.redirect('/posts');
})

module.exports = router;