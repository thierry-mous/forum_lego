
const { get } = require('../routes/inscription_route');
const db = require('../utility/config');

const getTopics = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT topics.*, users.username 
            FROM topics 
            JOIN users ON topics.users_id = users.id
        `;
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
                   COALESCE(admin.admin_status, 'User') AS user_role
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

const getTopicsByTags = (tags) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM topics
            WHERE tags_id = ?
        `;
        db.query(sql, [tags], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getTopicsByTags,
    getTopics,
    getPostsByTopicId
};