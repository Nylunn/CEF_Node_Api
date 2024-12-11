const express = require('express');
const Catways = require('../models/catways');  
const router = express.Router();

const service = require('../services/catways');

// Routes

router.put('/catways/add', service.createCatways);

module.exports = router;