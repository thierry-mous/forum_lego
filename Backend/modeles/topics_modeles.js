
const db = require('../utility/config');

const getTopics = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM topics';
        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getPostsByTopicId = (topicId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM post WHERE topics_id = ?';
        db.query(sql, topicId, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getTopics,
    getPostsByTopicId
};