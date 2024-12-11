const Catways = require('../models/catways');
const fs = require('fs')

// Creation of a catways

exports.createCatways  = async () => {
    const catways = new Catways({
        catwayNumber    : body.catwayNumber,
        type            : body.type,
        catwayState     : body.catwayState
    });
    
    try {
        let catways = await Catways.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
};
