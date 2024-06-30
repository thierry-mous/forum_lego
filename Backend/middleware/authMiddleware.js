const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utility/jwt');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).redirect('/login'); // Redirection vers la page de connexion
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error('Erreur de vérification du token :', err);
            return res.status(401).redirect('/login'); // Redirection vers la page de connexion
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = {
    verifyToken
};
