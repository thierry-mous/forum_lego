const express = require('express');

const { registerUser, authenticateUser, getUserById, updateUsers } = require('../controller/inscription_controller');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authenticateUser);

router.get('/profile/:id', getUserById);
router.put('/profile/:id', updateUsers);

module.exports = router;
