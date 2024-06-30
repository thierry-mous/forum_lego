const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../modeles/authModel');
const { jwtSecret } = require('../utility/jwt');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Nom d\'utilisateur, email et mot de passe requis');
    }
    try {
        const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
        const userId = await userModel.createUser(username, email, hashedPassword);

        const token = jwt.sign({ userId, username }, jwtSecret, { expiresIn: '1h' });

        res.cookie('jwtToken', token, { httpOnly: true, secure: false });
        res.json({ token });
    } catch (err) {
        console.error('Erreur lors de la création de l\'utilisateur :', err);
        res.status(500).send('Erreur lors de la création de l\'utilisateur');
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Nom d\'utilisateur et mot de passe requis');
    }
    try {
        const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
        const { id } = await userModel.authenticateUser(username, hashedPassword);

        const token = jwt.sign({ userId: id, username }, jwtSecret, { expiresIn: '1h' });

        res.cookie('jwtToken', token, { httpOnly: true, secure: false });
        res.json({ token });
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(401).send('Échec de la connexion');
    }
};

module.exports = {
    register,
    login
};
