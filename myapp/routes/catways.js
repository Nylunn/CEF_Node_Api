const express = require('express');
const Catways = require('../models/catways');  
const router = express.Router();
const {getCatways, getCatway, createCatways, updateCatways, deleteCatways} = require('../controllers/catways.controller')


//Récupérer les informations des catways
router.get('/', getCatways);
//Récupération d'un catway
router.get('/catways/details/:id', async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            // Au lieu de render 'error', renvoyons une réponse JSON
            return res.status(404).json({ error: 'Catway non trouvé' });
        }
        res.render('catway-details', { catway });
    } catch (error) {
        console.error('Erreur:', error);
        // Au lieu de render 'error', renvoyons une réponse JSON
        res.status(500).json({ error: 'Erreur serveur' });
    }
});
//Création d'un catway
router.post("/add", createCatways);
//Mise à jour d'un catway

router.put('/api/catways/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body;

        const updatedCatway = await Catway.findByIdAndUpdate(
            id,
            { type },
            { new: true, runValidators: true }
        );

        if (!updatedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }

        res.json(updatedCatway);
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
//Suppression d'un catway
router.delete("/:id", deleteCatways)

module.exports = router;