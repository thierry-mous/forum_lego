const db = require('../utility/config');

const getAllPosts = (callback) => {
    const sql = `
        SELECT post.id, post.body, post.publish_date, 
            users.username AS username,
            COALESCE(admin.admin_status, 'User') AS user_role,
            topics.title AS topic_title,
            COALESCE(SUM(likes.score), 0) AS likes
        FROM post 
        JOIN users ON post.users_id = users.id 
        JOIN topics ON post.topics_id = topics.id
        LEFT JOIN admin ON users.admin_id = admin.id
        LEFT JOIN likes ON post.id = likes.post_id
        GROUP BY post.id
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

const getPostsByTopicId = (topicId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT post.*, users.username, users.email, users.photo, users.biography, 
                COALESCE(admin.admin_status, 'User') AS user_role,
                topics.title AS title,
                tag.label AS tag,
                topics.users_id AS topic_user_id,
                COALESCE(SUM(likes.score), 0) AS likes
            FROM post
            JOIN users ON post.users_id = users.id
            LEFT JOIN admin ON users.admin_id = admin.id
            JOIN topics ON post.topics_id = topics.id
            JOIN tag ON topics.tags_id = tag.id
            LEFT JOIN likes ON post.id = likes.post_id
            WHERE post.topics_id = ?
            GROUP BY post.id;
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

const getPostsById = (postId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT post.*, topics.users_id AS topic_users_id,
                COALESCE(SUM(likes.score), 0) AS likes
            FROM post
            JOIN topics ON post.topics_id = topics.id
            LEFT JOIN likes ON post.id = likes.post_id
            WHERE post.id = ?
            GROUP BY post.id;
        `;
        db.query(sql, [postId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const deletePost = (postId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM post WHERE id = ?
        `;
        db.query(sql, [postId], (err, result) => {
            console.log('Delete post:', result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const likePost = async (postId, userId, score) => {
    return new Promise((resolve, reject) => {
        const checkLikeSQL = `
            SELECT * FROM likes WHERE post_id = ? AND user_id = ?
        `;
        db.query(checkLikeSQL, [postId, userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length > 0) {
                const updateLikeSQL = `
                    UPDATE likes SET score = ? WHERE post_id = ? AND user_id = ?
                `;
                db.query(updateLikeSQL, [score,postId, userId], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            } else {
                const insertLikeSQL = `
                    INSERT INTO likes (post_id, user_id, score) VALUES (?, ?, ?)
                `;
                db.query(insertLikeSQL, [postId, userId, score], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            }
        });
    });
};

const getLikesByPostId = (postId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT COALESCE(SUM(score), 0) AS likes FROM likes WHERE post_id = ?
        `;
        db.query(sql, [postId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0].likes);
            }
        });
    });
};



module.exports = { getAllPosts,
    createPost,
    getPostsById,
    getPostsByTopicId,
    deletePost,
    likePost,
    getLikesByPostId
     };