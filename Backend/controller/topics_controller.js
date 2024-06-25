const userModel = require('../modeles/topics_modeles.js');

const createTopic = async (topic) => {
    try {
        await userModel.createTopic(topic);
    } catch (err) {
        console.log(err);
    }
};

const getTopics = async (req, res) => {
    try {
        const topics = await userModel.getTopics();
        res.status(200).send(topics);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createTopic,
    getTopics
};