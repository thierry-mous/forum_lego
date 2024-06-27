const db = require('../utility/config');

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users SET ?';
        db.query(sql, user, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const getUserByUsernameOrEmail = (usernameOrEmail) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(sql, [usernameOrEmail, usernameOrEmail], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
};


const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
};

const updateUsers = (id, biography) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET biography = ? WHERE id = ?';
        db.query(sql, [biography, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    createUser,
    getUserByUsernameOrEmail,
    getUserById,
    updateUsers
};