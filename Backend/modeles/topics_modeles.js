const db = require('../utility/config');

const createTopic = (topic) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO topics SET ?';
        db.query(sql, topic, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

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
}

module.exports = {
    createTopic,
    getTopics
};