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


const createPost = async (req, res) => {
    const { body, topics_id, users_id } = req.body;

    if (!body || !topics_id || !users_id) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newPost = {
            body,
            publish_date: new Date(),
            topics_id,
            users_id
        };

        const result = await Post.createPost(newPost); 

        return res.status(200).json({
            message: 'Post created successfully',
            post: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

const likePost = async (req, res) => {
    const { id, userId } = req.body;
    console.log(id, userId);

    try {
        const result = await Post.likePost(id, userId);

        if (result.affectedRows === 0) {
            return res.status(404).send('Post not found');
        }

        return res.status(200).send('Post liked');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getAllPosts,
    createPost,
    likePost
};