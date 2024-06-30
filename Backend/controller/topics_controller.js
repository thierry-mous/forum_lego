const userModel = require('../modeles/topics_modeles.js');


const getTopics = async (req, res) => {
    try {
        const topics = await userModel.getTopics();
        res.status(200).send(topics);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};



const getTopicsByTags = async (req, res) => {
    const { tags } = req.params;
    const { sort } = req.query;

    try {
        const topics = await userModel.getTopicsByTags(tags, sort);

        res.status(200).json(topics);
    } catch (err) {
        console.error('Error fetching topics by tags:', err);
        res.status(500).send('Server error');
    }
};

const createTopic = async (req, res) => {
    const { title, body, state, users_id, tags_id } = req.body;

    if (!title || !body || !state || !users_id || !tags_id) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newTopic = {
            title,
            body,
            publish_date: new Date(),
            state,
            users_id,
            tags_id
        };

        const result = await userModel.createTopic(newTopic);
        return res.status(200).json({
            message: 'Topic created successfully',
            topic: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

module.exports = {
    getTopics,
    getTopicsByTags,
    createTopic
    
};