const Catways = require('../models/catways');
const fs = require('fs')

// Creation of a catways

exports.createCatways = () => {
    const catways = new Catways({
        
    });

    catways.save()
    .then(() => { res.status(201).json({message: 'Catways enregistré'})})
    .catch(error => { res.status(400).json( { error })}); 
};
