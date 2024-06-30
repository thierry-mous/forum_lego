const jwt = require('jsonwebtoken');

const jwtSecret = 'votreSecret'; // Clé secrète pour signer les JWT

module.exports = {
    jwtSecret,
    generateToken: (userId, username) => {
        return jwt.sign({ userId, username }, jwtSecret, { expiresIn: '1h' });
    },
    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
};
