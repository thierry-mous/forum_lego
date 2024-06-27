const express = require('express');
const {getTopics, getPostsByTopicId, getTopicsByTags } = require('../controller/topics_controller');

const router = express.Router();

router.get('/getTopics', getTopics);
router.get('/getTopics/:topicId', getPostsByTopicId);
router.get('/getTopicsByTags/:tags', getTopicsByTags);


module.exports = router;
