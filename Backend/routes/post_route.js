const express = require('express');
const { getAllPosts } = require('../controller/post_controller');

const router = express.Router();

router.get('/posts', getAllPosts);




module.exports = router;
