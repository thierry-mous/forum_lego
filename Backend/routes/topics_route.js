const express = require('express');
const {getTopics, getPostsByTopicId } = require('../controller/topics_controller');

const router = express.Router();

router.get('/getTopics', getTopics);
router.get('/getPostsByTopicId/:topicId', getPostsByTopicId);


module.exports = router;
