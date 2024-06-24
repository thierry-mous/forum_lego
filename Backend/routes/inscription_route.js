const express = require('express');
const { registerUser, authenticateUser } = require('../controller/inscription_controller');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authenticateUser);

module.exports = router;
