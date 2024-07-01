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

const getPostsByTopicId = async (req, res) => {
    const { topicId } = req.params;

    try {
        const posts = await Post.getPostsByTopicId(topicId);
        res.status(200).send(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    console.log('User ID:', userId);
    console.log('Post ID:', id);

    try {
        const post = await Post.getPostsById(id);   
        const topicUserId = post.topic_users_id;
        const postUserId = post.users_id;

        console.log('Topic User ID:', topicUserId);
        console.log('Post User ID:', postUserId);
        console.log('Post:', post);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (topicUserId !== userId && postUserId !== userId) {
            return res.status(403).send('You are not authorized to delete this post');
        }

        await Post.deletePost(id);
        res.status(200).send('Post deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

};

const likePost = async (req, res) => {
    const userId = req.body.userId; 
    const score = req.body.score;
    const postId = req.params.postId;

    try {
        await Post.likePost(postId, userId, score);
        const likes = await Post.getLikesByPostId(postId);
        res.status(200).json({ message: 'Post liked successfully', likes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};



module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    getPostsByTopicId,
    likePost
};

