const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.posts_list);

router.get('/:id', postsController.post_detail);

router.post('/:id', postsController.post_add_comment);

router.post('/create', postsController.post_create);

module.exports = router;