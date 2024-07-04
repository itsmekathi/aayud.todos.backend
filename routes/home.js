const config = require('config');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Welcome to - ${config.get('name')} `);
});

module.exports = router;