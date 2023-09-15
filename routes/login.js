const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('login - POST')
})

module.exports = router;