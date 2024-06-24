const crypto = require('crypto');
const userModel = require('../modeles/modeles');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!isUsernameValid(username)) {
        return res.status(400).send('Username must be alphanumeric and between 3 to 20 characters long.');
    }

    if (!isEmailValid(email)) {
        return res.status(400).send('Invalid email format.');
    }

    if (!isPasswordValid(password)) {
        return res.status(400).send('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
    }

    try {
        const hash = crypto.createHash('sha512').update(password).digest('hex');

        const newUser = {
            username,
            email,
            user_password: hash,
            photo: null,
            biography: null,
            user_connexion: null,
            admin_id: null
        };

        await userModel.createUser(newUser);
        return res.status(200).send('User registered successfully');
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            const duplicateField = err.sqlMessage.includes('username') ? 'Username' : 'Email';
            return res.status(400).send(`The ${duplicateField} already exists`);
        } else if (err.message.includes('Duplicate entry')) {
            return res.status(400).send('Username or Email already exists');
        }

        return res.status(500).send('Server error');
    }
};

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.getUserByUsername(username);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const hash = crypto.createHash('sha512').update(password).digest('hex');

        console.log('Hash from input:', hash);
        console.log('Stored hash:', user.user_password);

        if (user.user_password !== hash) {
            return res.status(401).send('Invalid password');
        }

        return res.status(200).send('Login successful');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};


function isUsernameValid(username) {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
}

function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isPasswordValid(password) {
    if (password.length < 8) {
        return false;
    }
    const regexUpper = /[A-Z]/;
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    return regexUpper.test(password) && regexSpecial.test(password);
}


module.exports = {
    registerUser,
    authenticateUser
};
