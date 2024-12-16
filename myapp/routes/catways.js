const express = require('express');
const Catways = require('../models/catways');  
const router = express.Router();
const {getCatways, getCatway, createCatways, updateCatways, deleteCatways} = require('../controllers/catways.controller')


// Routes


//Récupérer les informations des catways
router.get('/', getCatways); 
//Récupération d'un catway
router.get('/:id', getCatway);
//Création d'un catway
router.post("/", createCatways);
//Mise à jour d'un catway
router.put("/:id", updateCatways);
//Suppression d'un catway
router.delete("/:id", deleteCatways)

module.exports = router;