const express = require('express');
const { registerUser, authenticateUser } = require('../controller/topics_controller');

const router = express.Router();

router.post('/createTopic', createTopic);
router.get('/getTopics', getTopics);

module.exports = router;
