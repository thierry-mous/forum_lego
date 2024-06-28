const express = require('express');
const { getAllPosts, createPost, likePost } = require('../controller/post_controller');

const router = express.Router();

router.get('/posts', getAllPosts);

router.post('/createPost', createPost);
router.post('/like' , likePost);




module.exports = router;
