const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.post('/create', postsController.post_create);

router.get('/:id', postsController.post_detail);

router.post('/:id', postsController.post_add_comment);

router.get('/', postsController.posts_list);

module.exports = router;