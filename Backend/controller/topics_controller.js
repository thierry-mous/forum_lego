const userModel = require('../modeles/topics_modeles.js');
const { get } = require('../routes/inscription_route.js');


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

    try {
        const topics = await userModel.getTopicsByTags(tags);
        res.status(200).send(topics);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}



module.exports = {
    getTopics,
    getPostsByTopicId,
    getTopicsByTags
};