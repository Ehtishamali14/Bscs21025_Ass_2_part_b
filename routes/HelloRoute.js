const express = require('express');
const router = express.Router();
const helloController = require('../controllers/HelloController');

router.get('/hello/amjad', helloController.greetAmjad);

module.exports = router;
