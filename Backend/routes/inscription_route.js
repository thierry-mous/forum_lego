const express = require('express');

const { getUserById, updateUsers } = require('../controller/inscription_controller');
const router = express.Router();



router.get('/profile/:id', getUserById);
router.put('/profile/:id', updateUsers);

module.exports = router;
