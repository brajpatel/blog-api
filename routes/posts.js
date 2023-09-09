const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Homepage with some posts' });
})

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