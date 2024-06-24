const express = require('express');
const router = express.Router();
const controllers = require('../controllers/products');

router.post('/inscription', controllers.inscription);