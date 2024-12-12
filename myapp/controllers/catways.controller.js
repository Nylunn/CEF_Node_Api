const Catways = require('../models/catways');  

//Récupération des informations des catways

const getCatways = async (req , res) => {
       try {
        const catways = await Catways.find({});
        res.status(200).json(catways)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

//Création d'un catways

const createCatways = async (req, res) => {
    try {
        const catways = await Catways.create(req.body);
        res.status(200).json(catways); 
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

//Récupération des informations d'un catway

const getCatway = async (req, res) => {
    try {
        const { id } = req.params;
        const catways = await Catways.findById(id)
        res.status(200).json(catways)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
};

// Mise à jour d'un catways

const updateCatways = async (req, res) => {
    try {
        const { id } = req.params;
        const catways = await Catways.findByIdAndUpdate(id, req.body);
        if (!catways) {
          return res.status(404).json({message: "Catways non trouvé"});
        }
        const updatedCatways = await Catways.findById(id);
        res.status(200).json(updatedCatways)
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

//Suppression d'un catways

const deleteCatways = async (req, res) => {
    try {
        const { id } = req.params;
        const catways = await Catways.findByIdAndDelete(id);
        if (!catways) {
          return res.status(404).json({message: "Catways introuvable"})
        }
        res.status(200).json({message: "Catways supprimé"})
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

module.exports = {
    getCatways,
    getCatway,
    createCatways,
    updateCatways,
    deleteCatways
};