const Catways = require("../models/catways");

/**
 * Récupère un catway par son ID.
 * @param {string} id - L'ID du catway à récupérer.
 * @returns {Promise<Catway>} - Une promesse qui résout le catway trouvé.
 * @throws {Error} - 'catway_not_found' si le catway n'existe pas ou autre erreur.
 */
const getCatwayById = async (id) => {
    try {
        const catway = await Catways.findOne({ _id: id });
        if (catway) {
            return catway;
        } else {
            throw new Error('catway_not_found');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
  getCatwayById
};
