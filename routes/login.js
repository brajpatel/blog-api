const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('login - GET')
})

router.post('/', (req, res) => {
    res.send('login - POST')
})

module.exports = router;