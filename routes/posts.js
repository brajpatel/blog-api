const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.posts_list);

router.get('/:id', postsController.post_detail)

router.get('/create', (req, res) => {
    res.send('post create - GET')
})

router.post('/create', (req, res) => {
    res.send('post create - POST')
})

router.get('/delete', (req, res) => {
    res.send('post delete - GET');
})

router.post('/delete', (req, res) => {
    res.send('post delete - POST')
})

module.exports = router;