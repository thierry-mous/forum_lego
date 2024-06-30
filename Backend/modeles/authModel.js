const db = require('../utility/config');

const createUser = (username, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, user_password, admin_id) VALUES (?, ?, ?, ?)';
        db.query(query, [username, email, hashedPassword, 2], (err, results) => {
            if (err) {
                console.error('Erreur lors de la création de l\'utilisateur :', err);
                return reject(err);
            }
            resolve(results.insertId);
        });
    });
};

const authenticateUser = (username, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM users WHERE username = ? AND user_password = ?';
        db.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'authentification de l\'utilisateur :', err);
                return reject(err);
            }
            if (results.length > 0) {
                resolve({ id: results[0].id });
            } else {
                reject('Utilisateur non trouvé');
            }
        });
    });
};

module.exports = {
    createUser,
    authenticateUser
};
