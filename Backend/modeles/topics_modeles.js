
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
        const sql = `
            SELECT post.*, users.username, users.email, users.photo, users.biography, 
                   admin.admin_status
            FROM post
            JOIN users ON post.users_id = users.id
            LEFT JOIN admin ON users.admin_id = admin.id
            WHERE post.topics_id = ?
        `;
        db.query(sql, [topicId], (err, results) => {
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