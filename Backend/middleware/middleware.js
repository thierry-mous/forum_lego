const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authenticateJWT;