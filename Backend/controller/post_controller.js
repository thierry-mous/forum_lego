const Post = require('../modeles/post_modeles.js');

const getAllPosts = (req, res) => {
    Post.getAllPosts((err, posts) => {
        if (err) {
            console.error('Error fetching posts:', err); 
            return res.status(500).send('Server error');
        }
        res.json(posts);
    });
};

module.exports = {
    getAllPosts
};