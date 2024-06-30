const express = require('express');
const { getAllPosts, createPost, getPostsByTopicId, deletePost } = require('../controller/post_controller');
const { verifyToken } = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/:topicId', getPostsByTopicId);


router.post('/createPost', verifyToken, createPost);

router.delete('/deletePost/:id', verifyToken, deletePost);



module.exports = router;
