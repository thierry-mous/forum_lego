const db = require('../utility/config');

const Post = {
    getAllPosts: (callback) => {
        const sql = `
            SELECT post.id, post.body, post.publish_date, 
                users.username AS user_name,
                COALESCE(admin.admin_status, 'User') AS user_role,
                topics.title AS topic_title 
            FROM post 
            JOIN users ON post.users_id = users.id 
            JOIN topics ON post.topics_id = topics.id
            LEFT JOIN admin ON users.admin_id = admin.id
            ORDER BY post.publish_date DESC LIMIT 3
        `;
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Post;