const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.posts_list);

router.get('/:id', postsController.post_detail);

router.post('/create', (req, res) => {
    res.send('post create - POST')
})

module.exports = router;