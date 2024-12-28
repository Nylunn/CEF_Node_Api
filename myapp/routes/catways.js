const express = require('express');
const Catways = require('../models/catways');  
const router = express.Router();
const {getCatways, getCatway, createCatways, updateCatways, deleteCatways} = require('../controllers/catways.controller')


//Récupérer les informations des catways
router.get('/', getCatways);
//Récupération d'un catway
router.get('/:id', getCatway);
//Création d'un catway
router.post("/add", createCatways);
//Mise à jour d'un catway
router.put('/:id', async (req, res) => {
    console.log('PUT request received:', req.params.id, req.body); // Pour debug
    try {
        const result = await Catways.findByIdAndUpdate(
            req.params.id,
            { type: req.body.type },
            { new: true }
        );
        res.json(result);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: error.message });
    }
});
//Suppression d'un catway
router.delete("/:id", deleteCatways)

module.exports = router;