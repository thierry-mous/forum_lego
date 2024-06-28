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


const getPostsByTopicId = async (req, res) => {
    const { topicId } = req.params;

    try {
        const posts = await userModel.getPostsByTopicId(topicId);
        res.status(200).send(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

const getTopicsByTags = async (req, res) => {
    const { tags } = req.params;
    const { sort } = req.query; // Optionnel : Récupérer le paramètre de tri depuis la requête

    try {
        // Appel de la fonction du modèle avec tags et sort
        const topics = await userModel.getTopicsByTags(tags, sort);

        // Envoyer la réponse avec les topics récupérés
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
    getPostsByTopicId,
    getTopicsByTags,
    createTopic
    
};