// Dans users.js ou routes/users.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {createUser} = require('../controllers/users.controller') 

router.post('/add', createUser);

module.exports = router;