const express = require('express');

const { registerUser, authenticateUser, getUserById, updateUsers } = require('../controller/inscription_controller');
const router = express.Router();

// Routes pour l'inscription et l'authentification
router.post('/signup', registerUser);
router.post('/login', authenticateUser);

// Routes pour le profil utilisateur
router.get('/profile/:id', getUserById);
router.put('/profile/:id', updateUsers);

module.exports = router;
