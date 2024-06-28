const express = require('express');
const { getAllPosts, createPost } = require('../controller/post_controller');

const router = express.Router();

router.get('/posts', getAllPosts);

router.post('/createPost', createPost);




module.exports = router;
