const db = require('../utility/config');

const getAllPosts = (callback) => {
        const sql = `
            SELECT post.id, post.body, post.publish_date, 
                users.username AS username,
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


const createPost = async (post) => {
    const sql = `
        INSERT INTO post (body, publish_date, topics_id, users_id)
        VALUES (?, ?, ?, ?)
    `;
    const params = [
        post.body,
        post.publish_date,
        post.topics_id,
        post.users_id
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

const likePost = async (id, userId) => {
    const sql = `
        UPDATE post 
        SET likes = likes + 1
        WHERE id = ? AND users_id = ?
    `;
    const params = [id, userId];
    console.log(params);

    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};



module.exports = { getAllPosts,
    createPost,
    likePost
     };