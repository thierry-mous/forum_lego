const express = require('express');
const {getTopics, getPostsByTopicId, getTopicsByTags, createTopic } = require('../controller/topics_controller');

const router = express.Router();

router.get('/getTopics', getTopics);
router.get('/getTopics/:topicId', getPostsByTopicId);
router.get('/getTopicsByTags/:tags', getTopicsByTags);

router.post('/createTopic', createTopic);

module.exports = router;
