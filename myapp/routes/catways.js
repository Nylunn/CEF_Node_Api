const express = require('express');
const Catways = require('../models/catways');  
const router = express.Router();
const {getCatways, getCatway, createCatways, updateCatways, deleteCatways} = require('../controllers/catways.controller')

const service = require('../services/catways');

// Routes

router.get('/catways/', getCatways); 

router.get('/catways/:id', getCatway);

router.post("/catways/add", createCatways);

router.put("/catways/update", updateCatways);

router.delete("/catways/:id", deleteCatways)

module.exports = router;