const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/list', profileController.getProfilesFromCSV);
router.post('/', profileController.createProfile);

module.exports = router;
