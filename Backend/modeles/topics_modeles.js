
const { get } = require('../routes/inscription_route');
const db = require('../utility/config');

const getTopics = () => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT topics.*, users.username, 
               COALESCE(admin.admin_status, 'User') AS admin_status
        FROM topics 
        JOIN users ON topics.users_id = users.id
        LEFT JOIN admin ON users.admin_id = admin.id
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

const getTopicsByTags = (tagsId, sortBy = 'recent') => {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT topics.*, users.username, COALESCE(admin.admin_status, 'User') AS admin_status, tag.label AS tag_label
            FROM topics
            JOIN users ON topics.users_id = users.id
            LEFT JOIN admin ON users.admin_id = admin.id
            LEFT JOIN tag ON topics.tags_id = tag.id
            WHERE topics.tags_id = ?
        `;

        if (sortBy === 'recent') {
            sql += ' ORDER BY topics.publish_date DESC';
        } else if (sortBy === 'older') {
            sql += ' ORDER BY topics.publish_date ASC';
        }

        db.query(sql, [tagsId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const createTopic = async (topic) => {
    const sql = `
        INSERT INTO topics (title, body, publish_date, state, users_id, tags_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
        topic.title,
        topic.body,
        topic.publish_date,
        topic.state,
        topic.users_id,
        topic.tags_id
    ];
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};


module.exports = {
    getTopicsByTags,
    getTopics,
    createTopic
};